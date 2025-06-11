<script lang="ts">
  import { page } from '$app/stores';
  
  $: isAdminRoute = $page.url.pathname.startsWith('/admin');
</script>

<div class="app">
  {#if !isAdminRoute}
    <header class="header">
      <div class="container">
        <nav class="nav">
          <a href="/" class="logo">
            <span class="logo-icon">💝</span>
            <span class="logo-text">JamiiFund</span>
          </a>
          <div class="nav-links">
            <a href="/" class="nav-link">Projects</a>
            <a href="/about" class="nav-link">About</a>
          </div>
        </nav>
      </div>
    </header>
  {/if}

  <main class="main">
    <slot />
  </main>

  {#if !isAdminRoute}
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>JamiiFund</h3>
            <p>Supporting social projects through anonymous donations.</p>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <a href="/">Projects</a>
            <a href="/about">About</a>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>Email: info@jamiifund.org</p>
            <p>Phone: +254 700 000 000</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 JamiiFund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  {/if}
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #2563eb;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .logo-icon {
    font-size: 2rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-link {
    text-decoration: none;
    color: #64748b;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: #2563eb;
  }

  .main {
    flex: 1;
  }

  .footer {
    background: #1e293b;
    color: white;
    margin-top: auto;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 3rem 0 2rem;
  }

  .footer-section h3,
  .footer-section h4 {
    margin-bottom: 1rem;
    color: #f1f5f9;
  }

  .footer-section p,
  .footer-section a {
    color: #cbd5e1;
    text-decoration: none;
    margin-bottom: 0.5rem;
    display: block;
  }

  .footer-section a:hover {
    color: white;
  }

  .footer-bottom {
    border-top: 1px solid #334155;
    padding: 1rem 0;
    text-align: center;
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    .nav {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-links {
      gap: 1rem;
    }

    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
</style>
