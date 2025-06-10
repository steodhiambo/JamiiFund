<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  let statusChecking = true;
  let currentStatus = data.donation.status;
  
  // Check donation status periodically
  onMount(() => {
    if (currentStatus === 'pending') {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/donation/status?id=${data.donation.id}`);
          const result = await response.json();
          
          if (result.status !== 'pending') {
            currentStatus = result.status;
            statusChecking = false;
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Error checking status:', error);
        }
      }, 3000); // Check every 3 seconds
      
      // Stop checking after 5 minutes
      setTimeout(() => {
        statusChecking = false;
        clearInterval(interval);
      }, 300000);
      
      return () => clearInterval(interval);
    } else {
      statusChecking = false;
    }
  });
  
  $: formattedAmount = (data.donation.amount / 100).toLocaleString();
</script>

<svelte:head>
  <title>Donation Status - DonateGood</title>
</svelte:head>

<div class="success-page">
  <div class="container">
    <div class="success-card">
      {#if currentStatus === 'completed'}
        <div class="success-icon">✅</div>
        <h1>Thank You!</h1>
        <p class="success-message">
          Your donation of <strong>KES {formattedAmount}</strong> to 
          <strong>{data.project.title}</strong> has been completed successfully.
        </p>
        <div class="success-details">
          <p>Your contribution makes a real difference in supporting this important cause.</p>
          <p>A confirmation has been sent to your phone via SMS.</p>
        </div>
      {:else if currentStatus === 'failed'}
        <div class="error-icon">❌</div>
        <h1>Payment Failed</h1>
        <p class="error-message">
          Unfortunately, your donation of <strong>KES {formattedAmount}</strong> could not be processed.
        </p>
        <div class="error-details">
          <p>This could be due to insufficient funds, cancelled payment, or network issues.</p>
          <p>Please try again or contact your mobile money provider for assistance.</p>
        </div>
      {:else if statusChecking}
        <div class="pending-icon">⏳</div>
        <h1>Processing Payment</h1>
        <p class="pending-message">
          We're processing your donation of <strong>KES {formattedAmount}</strong> to 
          <strong>{data.project.title}</strong>.
        </p>
        <div class="pending-details">
          <p>Please check your phone for the Mpesa payment prompt and complete the transaction.</p>
          <p>This page will update automatically once payment is confirmed.</p>
        </div>
        <div class="loading-spinner"></div>
      {:else}
        <div class="pending-icon">⏳</div>
        <h1>Payment Pending</h1>
        <p class="pending-message">
          Your donation of <strong>KES {formattedAmount}</strong> is still being processed.
        </p>
        <div class="pending-details">
          <p>If you completed the Mpesa payment, it may take a few minutes to reflect.</p>
          <p>You can refresh this page to check the latest status.</p>
        </div>
      {/if}
      
      <div class="actions">
        <a href="/project/{data.project.id}" class="btn btn-secondary">
          Back to Project
        </a>
        <a href="/" class="btn btn-primary">
          View All Projects
        </a>
        {#if currentStatus === 'failed'}
          <a href="/project/{data.project.id}" class="btn btn-primary">
            Try Again
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .success-page {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .success-card {
    background: white;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .success-icon,
  .error-icon,
  .pending-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  .success-message,
  .error-message,
  .pending-message {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: #475569;
    line-height: 1.6;
  }

  .success-details,
  .error-details,
  .pending-details {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    text-align: left;
  }

  .success-details p,
  .error-details p,
  .pending-details p {
    margin-bottom: 0.75rem;
    color: #64748b;
    line-height: 1.6;
  }

  .success-details p:last-child,
  .error-details p:last-child,
  .pending-details p:last-child {
    margin-bottom: 0;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 1rem auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }

  .btn-primary {
    background: #2563eb;
    color: white;
  }

  .btn-primary:hover {
    background: #1d4ed8;
  }

  .btn-secondary {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background: #e2e8f0;
  }

  @media (max-width: 768px) {
    .success-card {
      padding: 2rem;
    }

    h1 {
      font-size: 2rem;
    }

    .success-message,
    .error-message,
    .pending-message {
      font-size: 1.1rem;
    }

    .actions {
      flex-direction: column;
    }
  }
</style>
