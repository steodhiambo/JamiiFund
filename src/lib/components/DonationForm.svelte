<script lang="ts">
  import { goto } from '$app/navigation';
  
  export let projectId: number;
  
  let amount = '';
  let phoneNumber = '';
  let isSubmitting = false;
  let error = '';
  
  const predefinedAmounts = [100, 500, 1000, 2000, 5000]; // In KES
  
  function selectAmount(value: number) {
    amount = value.toString();
  }
  
  function formatPhoneNumber(value: string) {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as Kenyan number
    if (digits.startsWith('254')) {
      return digits;
    } else if (digits.startsWith('0')) {
      return '254' + digits.slice(1);
    } else if (digits.startsWith('7') || digits.startsWith('1')) {
      return '254' + digits;
    }
    
    return digits;
  }
  
  async function handleSubmit() {
    error = '';
    
    if (!amount || parseFloat(amount) < 1) {
      error = 'Please enter a valid amount (minimum KES 1)';
      return;
    }
    
    if (!phoneNumber) {
      error = 'Please enter your phone number';
      return;
    }
    
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (formattedPhone.length < 12) {
      error = 'Please enter a valid Kenyan phone number';
      return;
    }
    
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId,
          amount: Math.round(parseFloat(amount) * 100), // Convert to cents
          phone_number: formattedPhone
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to initiate donation');
      }
      
      // Redirect to success page with donation ID
      goto(`/donation/success?id=${result.donationId}`);
      
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="donation-form">
  <div class="form-group">
    <label for="amount">Donation Amount (KES)</label>
    <div class="amount-section">
      <div class="predefined-amounts">
        {#each predefinedAmounts as value}
          <button
            type="button"
            class="amount-btn"
            class:selected={amount === value.toString()}
            on:click={() => selectAmount(value)}
          >
            KES {value}
          </button>
        {/each}
      </div>
      <input
        type="number"
        id="amount"
        bind:value={amount}
        placeholder="Enter custom amount"
        min="1"
        step="1"
        required
        class="amount-input"
      />
    </div>
  </div>
  
  <div class="form-group">
    <label for="phone">Phone Number</label>
    <input
      type="tel"
      id="phone"
      bind:value={phoneNumber}
      placeholder="0712345678 or +254712345678"
      required
      class="phone-input"
    />
    <small class="help-text">
      Enter your Mpesa phone number. You'll receive a payment prompt.
    </small>
  </div>
  
  {#if error}
    <div class="error-message">
      {error}
    </div>
  {/if}
  
  <button
    type="submit"
    disabled={isSubmitting}
    class="submit-btn"
  >
    {#if isSubmitting}
      Processing...
    {:else}
      Donate via Mpesa
    {/if}
  </button>
  
  <div class="security-note">
    <p>🔒 Your donation is secure and anonymous. We don't store personal information.</p>
  </div>
</form>

<style>
  .donation-form {
    max-width: 400px;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
  }

  .amount-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .predefined-amounts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .amount-btn {
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .amount-btn:hover {
    border-color: #2563eb;
  }

  .amount-btn.selected {
    border-color: #2563eb;
    background: #eff6ff;
    color: #2563eb;
  }

  .amount-input,
  .phone-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .amount-input:focus,
  .phone-input:focus {
    outline: none;
    border-color: #2563eb;
  }

  .help-text {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .error-message {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: #059669;
  }

  .submit-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  .security-note {
    margin-top: 1rem;
    padding: 1rem;
    background: #f0f9ff;
    border-radius: 8px;
    text-align: center;
  }

  .security-note p {
    margin: 0;
    font-size: 0.875rem;
    color: #0369a1;
  }

  @media (max-width: 480px) {
    .predefined-amounts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
