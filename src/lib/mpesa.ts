import { dev } from '$app/environment';
import {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_BUSINESS_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL
} from '$env/static/private';
import type { MpesaResponse } from './types';

// Validate required environment variables
function validateMpesaConfig() {
  const requiredVars = {
    MPESA_CONSUMER_KEY,
    MPESA_CONSUMER_SECRET,
    MPESA_PASSKEY,
    MPESA_CALLBACK_URL
  };

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value || value.includes('your_') || value.includes('replace_')) {
      console.warn(`⚠️  ${key} is not properly configured. Mpesa payments will fail.`);
    }
  }
}

// Validate configuration on module load
validateMpesaConfig();

// Mpesa configuration
const MPESA_CONFIG = {
  consumerKey: dev ? MPESA_CONSUMER_KEY || 'your_sandbox_consumer_key' : 'your_production_consumer_key',
  consumerSecret: dev ? MPESA_CONSUMER_SECRET || 'your_sandbox_consumer_secret' : 'your_production_consumer_secret',
  businessShortCode: dev ? MPESA_BUSINESS_SHORTCODE || '174379' : 'your_production_shortcode',
  passkey: dev ? MPESA_PASSKEY || 'your_sandbox_passkey' : 'your_production_passkey',
  baseUrl: dev ? 'https://sandbox.safaricom.co.ke' : 'https://api.safaricom.co.ke',
  callbackUrl: dev ? MPESA_CALLBACK_URL || 'https://your-ngrok-url.ngrok.io/api/mpesa/callback' : 'https://yourdomain.com/api/mpesa/callback'
};

class MpesaService {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');
    
    try {
      const response = await fetch(`${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 minute before expiry
      
      return this.accessToken!;
    } catch (error) {
      console.error('Error getting Mpesa access token:', error);
      throw error;
    }
  }

  async initiateSTKPush(phoneNumber: string, amount: number, accountReference: string): Promise<MpesaResponse> {
    const accessToken = await this.getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_CONFIG.businessShortCode}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');

    // Format phone number (remove + and ensure it starts with 254)
    const formattedPhone = phoneNumber.replace(/^\+?/, '').replace(/^0/, '254');

    const payload = {
      BusinessShortCode: MPESA_CONFIG.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount / 100), // Convert from cents to KES
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.businessShortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: MPESA_CONFIG.callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: `Donation to ${accountReference}`
    };

    try {
      const response = await fetch(`${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`STK Push failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error initiating STK push:', error);
      throw error;
    }
  }

  async queryTransaction(checkoutRequestId: string): Promise<any> {
    const accessToken = await this.getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_CONFIG.businessShortCode}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');

    const payload = {
      BusinessShortCode: MPESA_CONFIG.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    };

    try {
      const response = await fetch(`${MPESA_CONFIG.baseUrl}/mpesa/stkpushquery/v1/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Transaction query failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error querying transaction:', error);
      throw error;
    }
  }
}

export const mpesaService = new MpesaService();
