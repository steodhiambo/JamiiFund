<script lang="ts">
  import type { PageData } from './$types';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>JamiiFund - Support Social Projects</title>
  <meta name="description" content="Browse and support social projects through anonymous donations. Help fund clean water, education, and food security initiatives." />
</svelte:head>

<div class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Make a Difference Today</h1>
      <p class="hero-subtitle">
        Support social projects that matter. Your anonymous donations help build better communities
        through clean water, education, and food security initiatives.
      </p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">{data.projects.length}</span>
          <span class="stat-label">Active Projects</span>
        </div>
        <div class="stat">
          <span class="stat-number">
            {data.projects.reduce((sum, p) => sum + p.current_amount, 0).toLocaleString()}
          </span>
          <span class="stat-label">KES Raised</span>
        </div>
      </div>
    </div>
  </div>
</div>

<section class="projects">
  <div class="container">
    <div class="section-header">
      <h2>Current Projects</h2>
      <p>Choose a project to support and make your donation anonymously</p>
    </div>

    {#if data.projects.length > 0}
      <div class="projects-grid">
        {#each data.projects as project}
          <ProjectCard {project} />
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        <p>No projects available at the moment. Check back soon!</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .projects {
    padding: 4rem 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  .section-header p {
    font-size: 1.1rem;
    color: #64748b;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    color: #64748b;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .hero-stats {
      flex-direction: column;
      gap: 1rem;
    }

    .section-header h2 {
      font-size: 2rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
