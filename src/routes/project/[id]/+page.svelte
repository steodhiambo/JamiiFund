<script lang="ts">
  import type { PageData } from './$types';
  import DonationForm from '$lib/components/DonationForm.svelte';
  
  export let data: PageData;
  
  $: project = data.project;
  $: progressPercentage = Math.min((project.current_amount / project.goal_amount) * 100, 100);
  $: formattedGoal = (project.goal_amount / 100).toLocaleString();
  $: formattedCurrent = (project.current_amount / 100).toLocaleString();
  $: remaining = Math.max(project.goal_amount - project.current_amount, 0);
  $: formattedRemaining = (remaining / 100).toLocaleString();
</script>

<svelte:head>
  <title>{project.title} - JamiiFund</title>
  <meta name="description" content={project.description} />
</svelte:head>

<div class="project-page">
  <div class="container">
    <div class="back-link">
      <a href="/">← Back to Projects</a>
    </div>
    
    <div class="project-header">
      <div class="project-image">
        {#if project.image_url}
          <img src={project.image_url} alt={project.title} />
        {:else}
          <div class="placeholder-image">
            <span class="placeholder-icon">📋</span>
          </div>
        {/if}
      </div>
      
      <div class="project-info">
        <h1 class="project-title">{project.title}</h1>
        <p class="project-description">{project.description}</p>
        
        <div class="project-stats">
          <div class="stat">
            <span class="stat-value">KES {formattedCurrent}</span>
            <span class="stat-label">Raised</span>
          </div>
          <div class="stat">
            <span class="stat-value">KES {formattedGoal}</span>
            <span class="stat-label">Goal</span>
          </div>
          <div class="stat">
            <span class="stat-value">KES {formattedRemaining}</span>
            <span class="stat-label">Remaining</span>
          </div>
        </div>
        
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {progressPercentage}%"></div>
          </div>
          <div class="progress-text">
            <span>{progressPercentage.toFixed(1)}% funded</span>
            <span>{data.recentDonations.length} donations</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="project-content">
      <div class="main-content">
        <div class="donation-section">
          <h2>Make a Donation</h2>
          <p>Your donation is anonymous and secure. Choose an amount and pay via Mpesa.</p>
          <DonationForm projectId={project.id} />
        </div>
        
        {#if data.recentDonations.length > 0}
          <div class="recent-donations">
            <h3>Recent Donations</h3>
            <div class="donations-list">
              {#each data.recentDonations as donation}
                <div class="donation-item">
                  <span class="donation-amount">KES {(donation.amount / 100).toLocaleString()}</span>
                  <span class="donation-date">
                    {new Date(donation.created_at).toLocaleDateString()}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .project-page {
    padding: 2rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .back-link {
    margin-bottom: 2rem;
  }

  .back-link a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
  }

  .back-link a:hover {
    text-decoration: underline;
  }

  .project-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .project-image {
    height: 400px;
    border-radius: 12px;
    overflow: hidden;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .placeholder-icon {
    font-size: 4rem;
    opacity: 0.5;
  }

  .project-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #1e293b;
    line-height: 1.2;
  }

  .project-description {
    font-size: 1.1rem;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .project-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat {
    text-align: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .stat-value {
    display: block;
    font-size: 1.25rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #64748b;
  }

  .progress-section {
    margin-bottom: 2rem;
  }

  .progress-bar {
    height: 12px;
    background: #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    transition: width 0.3s ease;
  }

  .progress-text {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #64748b;
  }

  .project-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
  }

  .donation-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .donation-section h2 {
    margin-bottom: 1rem;
    color: #1e293b;
  }

  .donation-section p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .recent-donations {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: fit-content;
  }

  .recent-donations h3 {
    margin-bottom: 1rem;
    color: #1e293b;
  }

  .donations-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .donation-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 6px;
  }

  .donation-amount {
    font-weight: 500;
    color: #059669;
  }

  .donation-date {
    font-size: 0.85rem;
    color: #64748b;
  }

  @media (max-width: 768px) {
    .project-header {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .project-image {
      height: 250px;
    }

    .project-title {
      font-size: 2rem;
    }

    .project-stats {
      grid-template-columns: 1fr;
    }

    .project-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
