<script lang="ts">
  import type { Project } from '$lib/types';

  export let project: Project;

  let imageError = false;
  let imageLoaded = false;

  $: progressPercentage = Math.min((project.current_amount / project.goal_amount) * 100, 100);
  $: formattedGoal = (project.goal_amount / 100).toLocaleString();
  $: formattedCurrent = (project.current_amount / 100).toLocaleString();

  function handleImageError() {
    console.log('Image failed to load:', project.image_url);
    imageError = true;
  }

  function handleImageLoad() {
    console.log('Image loaded successfully:', project.image_url);
    imageError = false;
    imageLoaded = true;
  }
</script>

<div class="project-card">
  <div class="project-image">
    {#if project.image_url}
      <img
        src={project.image_url}
        alt={project.title}
        on:error={handleImageError}
        on:load={handleImageLoad}
      />
    {:else}
      <div class="placeholder-image">
        <span class="placeholder-icon">📋</span>
      </div>
    {/if}
    {#if imageError}
      <div class="placeholder-image">
        <span class="placeholder-icon">📋</span>
        <div class="error-text">Image failed to load</div>
      </div>
    {/if}
  </div>
  
  <div class="project-content">
    <h3 class="project-title">{project.title}</h3>
    <p class="project-description">{project.description}</p>
    
    <div class="project-progress">
      <div class="progress-info">
        <span class="current-amount">KES {formattedCurrent}</span>
        <span class="goal-amount">of KES {formattedGoal}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: {progressPercentage}%"></div>
      </div>
      <div class="progress-percentage">{progressPercentage.toFixed(1)}% funded</div>
    </div>
    
    <div class="project-actions">
      <a href="/project/{project.id}" class="btn btn-primary">
        Donate Now
      </a>
      <a href="/project/{project.id}" class="btn btn-secondary">
        Learn More
      </a>
    </div>
  </div>
</div>

<style>
  .project-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    max-width: 100%;
    width: 100%;
  }

  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .project-image {
    height: 200px;
    overflow: hidden;
    position: relative;
    background: #f8fafc;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.3s ease;
  }

  .project-card:hover .project-image img {
    transform: scale(1.05);
  }

  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .placeholder-icon {
    font-size: 3rem;
    opacity: 0.5;
  }

  .error-text {
    font-size: 0.8rem;
    color: #ef4444;
    margin-top: 0.5rem;
  }

  .image-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #1E40AF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .project-image img.loading {
    opacity: 0;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #1E40AF;
    line-height: 1.3;
  }

  .project-description {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .project-progress {
    margin-bottom: 1.5rem;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .current-amount {
    font-weight: bold;
    color: #059669;
  }

  .goal-amount {
    color: #64748b;
  }

  .progress-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #059669 0%, #059669 100%);
    transition: width 0.3s ease;
  }

  .progress-percentage {
    font-size: 0.85rem;
    color: #64748b;
    text-align: center;
  }

  .project-actions {
    display: flex;
    gap: 0.75rem;
  }

  .btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }

  .btn-primary {
    background: #FB923C;
    color: white;
  }

  .btn-primary:hover {
    background: #ea7c1f;
  }

  .btn-secondary {
    background: #F8FAFC;
    color: #64748B;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background: #e2e8f0;
    color: #1E40AF;
  }

  @media (max-width: 768px) {
    .project-image {
      height: 180px;
    }

    .project-actions {
      flex-direction: column;
    }

    .project-content {
      padding: 1rem;
    }
  }
</style>
