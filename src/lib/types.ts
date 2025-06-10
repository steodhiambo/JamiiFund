export interface Project {
  id: number;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: number;
  project_id: number;
  amount: number;
  mpesa_transaction_id?: string;
  phone_number?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  project_title?: string; // For joined queries
}

export interface DonationRequest {
  project_id: number;
  amount: number;
  phone_number: string;
}

export interface MpesaResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export interface MpesaCallback {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}
