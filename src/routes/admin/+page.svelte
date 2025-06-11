<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: formattedTotalRaised = (data.stats.totalRaised / 100).toLocaleString();
</script>

<svelte:head>
  <title>Admin Dashboard - JamiiFund</title>
</svelte:head>

<div class="dashboard">
  <div class="dashboard-header">
    <h1>Dashboard</h1>
    <p>Overview of donation platform performance</p>
  </div>
  
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon">📊</div>
      <div class="stat-content">
        <div class="stat-value">{data.stats.totalProjects}</div>
        <div class="stat-label">Total Projects</div>
      </div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">💰</div>
      <div class="stat-content">
        <div class="stat-value">KES {formattedTotalRaised}</div>
        <div class="stat-label">Total Raised</div>
      </div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🎯</div>
      <div class="stat-content">
        <div class="stat-value">{data.stats.totalDonations}</div>
        <div class="stat-label">Completed Donations</div>
      </div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">⏳</div>
      <div class="stat-content">
        <div class="stat-value">{data.stats.pendingDonations}</div>
        <div class="stat-label">Pending Donations</div>
      </div>
    </div>
  </div>
  
  <div class="dashboard-content">
    <div class="section">
      <h2>Project Performance</h2>
      <div class="projects-table">
        <div class="table-header">
          <div>Project</div>
          <div>Goal</div>
          <div>Raised</div>
          <div>Progress</div>
          <div>Donations</div>
        </div>
        {#each data.projectStats as project}
          <div class="table-row">
            <div class="project-info">
              <div class="project-title">{project.title}</div>
            </div>
            <div>KES {(project.goal_amount / 100).toLocaleString()}</div>
            <div>KES {(project.current_amount / 100).toLocaleString()}</div>
            <div class="progress-cell">
              <div class="progress-bar">
                <div class="progress-fill" style="width: {project.progressPercentage}%"></div>
              </div>
              <span class="progress-text">{project.progressPercentage.toFixed(1)}%</span>
            </div>
            <div>{project.donationCount}</div>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="section">
      <h2>Recent Donations</h2>
      {#if data.recentDonations.length > 0}
        <div class="donations-list">
          {#each data.recentDonations as donation}
            <div class="donation-item">
              <div class="donation-info">
                <div class="donation-project">{donation.project_title}</div>
                <div class="donation-date">
                  {new Date(donation.created_at).toLocaleDateString()} at {new Date(donation.created_at).toLocaleTimeString()}
                </div>
              </div>
              <div class="donation-amount">
                KES {(donation.amount / 100).toLocaleString()}
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          <p>No donations yet</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
  }

  .dashboard-header {
    margin-bottom: 2rem;
  }

  .dashboard-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #1e293b;
  }

  .dashboard-header p {
    color: #64748b;
    font-size: 1.1rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-icon {
    font-size: 2.5rem;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    color: #64748b;
    font-size: 0.9rem;
  }

  .dashboard-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .section h2 {
    margin-bottom: 1.5rem;
    color: #1e293b;
  }

  .projects-table {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr 0.5fr;
    gap: 1rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr 0.5fr;
    gap: 1rem;
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    align-items: center;
  }

  .project-title {
    font-weight: 500;
    color: #1e293b;
  }

  .progress-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .progress-bar {
    flex: 1;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.75rem;
    color: #64748b;
    min-width: 35px;
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
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .donation-project {
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  .donation-date {
    font-size: 0.75rem;
    color: #64748b;
  }

  .donation-amount {
    font-weight: 600;
    color: #059669;
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #64748b;
  }

  @media (max-width: 768px) {
    .dashboard-content {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .table-header,
    .table-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .table-header {
      display: none;
    }

    .table-row {
      background: #f8fafc;
      border-radius: 8px;
      border: none;
      margin-bottom: 0.5rem;
    }
  }
</style>
