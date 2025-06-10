<script lang="ts">
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  
  export let data: LayoutData;
  
  $: isLoginPage = $page.url.pathname === '/admin/login';
</script>

<div class="admin-layout">
  {#if data.isAuthenticated && !isLoginPage}
    <nav class="admin-nav">
      <div class="nav-brand">
        <a href="/admin">🏠 Admin Dashboard</a>
      </div>
      <div class="nav-links">
        <a href="/admin" class:active={$page.url.pathname === '/admin'}>
          Dashboard
        </a>
        <a href="/admin/projects" class:active={$page.url.pathname.startsWith('/admin/projects')}>
          Projects
        </a>
        <a href="/admin/donations" class:active={$page.url.pathname === '/admin/donations'}>
          Donations
        </a>
        <a href="/" target="_blank">
          View Site
        </a>
        <form action="/admin/logout" method="POST" class="logout-form">
          <button type="submit" class="logout-btn">Logout</button>
        </form>
      </div>
    </nav>
  {/if}
  
  <main class="admin-main" class:full-height={isLoginPage}>
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    min-height: 100vh;
    background: #f8fafc;
  }

  .admin-nav {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .nav-brand a {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1e293b;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-links a {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: #2563eb;
    background: #eff6ff;
  }

  .logout-form {
    margin: 0;
  }

  .logout-btn {
    background: #dc2626;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .logout-btn:hover {
    background: #b91c1c;
  }

  .admin-main {
    padding: 2rem;
  }

  .admin-main.full-height {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  @media (max-width: 768px) {
    .admin-nav {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .nav-links {
      flex-wrap: wrap;
      gap: 1rem;
    }

    .admin-main {
      padding: 1rem;
    }
  }
</style>
