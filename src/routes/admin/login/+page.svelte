<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  export let form: ActionData;
  
  let isSubmitting = false;
</script>

<svelte:head>
  <title>Admin Login - JamiiFund</title>
</svelte:head>

<div class="login-container">
  <div class="login-card">
    <div class="login-header">
      <h1>Admin Login</h1>
      <p>Enter your password to access the admin dashboard</p>
    </div>
    
    <form 
      method="POST" 
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          isSubmitting = false;
          await update();
        };
      }}
      class="login-form"
    >
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          disabled={isSubmitting}
          class="password-input"
          placeholder="Enter admin password"
        />
      </div>
      
      {#if form?.error}
        <div class="error-message">
          {form.error}
        </div>
      {/if}
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        class="login-btn"
      >
        {#if isSubmitting}
          Logging in...
        {:else}
          Login
        {/if}
      </button>
    </form>
    
    <div class="login-footer">
      <p>Demo password: <code>admin123</code></p>
      <a href="/">← Back to main site</a>
    </div>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1E40AF 0%, #059669 100%);
    padding: 2rem;
  }

  .login-card {
    background: white;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login-header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #1E40AF;
  }

  .login-header p {
    color: #64748b;
  }

  .login-form {
    margin-bottom: 2rem;
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

  .password-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .password-input:focus {
    outline: none;
    border-color: #1E40AF;
  }

  .password-input:disabled {
    background: #f9fafb;
    cursor: not-allowed;
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

  .login-btn {
    width: 100%;
    padding: 0.75rem;
    background: #FB923C;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .login-btn:hover:not(:disabled) {
    background: #ea7c1f;
  }

  .login-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  .login-footer {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .login-footer p {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #64748b;
  }

  .login-footer code {
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    color: #1e293b;
  }

  .login-footer a {
    color: #FB923C;
    text-decoration: none;
    font-weight: 500;
  }

  .login-footer a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .login-container {
      padding: 1rem;
    }

    .login-card {
      padding: 2rem;
      max-width: 100%;
    }

    .login-header h1 {
      font-size: 1.75rem;
    }

    .login-header p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .login-card {
      padding: 1.5rem;
    }

    .login-header h1 {
      font-size: 1.5rem;
    }
  }
</style>
