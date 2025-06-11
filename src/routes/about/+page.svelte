<svelte:head>
  <title>About Us - JamiiFund</title>
  <meta name="description" content="Learn about JamiiFund's mission to support social projects through anonymous donations. Discover how we're making a difference in communities." />
</svelte:head>

<div class="about-page">
  <div class="container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>About JamiiFund</h1>
        <p class="hero-subtitle">
          Empowering communities through anonymous donations and transparent social impact
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section">
      <div class="content-grid">
        <div class="text-content">
          <h2>Our Mission</h2>
          <p>
            JamiiFund is dedicated to creating positive social change by connecting generous donors 
            with impactful community projects. We believe that everyone deserves access to clean water, 
            quality education, and food security.
          </p>
          <p>
            Through our anonymous donation platform, we make it easy for well-wishers to support 
            causes they care about while ensuring complete transparency in how funds are used.
          </p>
        </div>
        <div class="image-placeholder">
          <div class="placeholder-content">
            <span class="placeholder-icon">🤝</span>
            <p>Community Impact</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section">
      <h2 class="section-title">Our Values</h2>
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon">🔒</div>
          <h3>Privacy & Anonymity</h3>
          <p>We protect donor privacy by enabling completely anonymous donations without requiring personal information.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">📊</div>
          <h3>Transparency</h3>
          <p>Every donation is tracked and project progress is visible to ensure funds reach their intended purpose.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🌍</div>
          <h3>Community Impact</h3>
          <p>We focus on projects that create lasting positive change in education, health, and basic needs.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">⚡</div>
          <h3>Efficiency</h3>
          <p>Our streamlined platform ensures donations reach projects quickly with minimal administrative overhead.</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section">
      <h2 class="section-title">How It Works</h2>
      <div class="steps-grid">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Browse Projects</h3>
          <p>Explore verified social projects that need funding support</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Choose Amount</h3>
          <p>Select how much you'd like to donate - every amount makes a difference</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Pay Securely</h3>
          <p>Complete your donation using secure Mpesa payment integration</p>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <h3>Track Impact</h3>
          <p>See how your donation contributes to the project's progress</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section">
      <div class="contact-section">
        <h2>Get In Touch</h2>
        <p>Have questions about our projects or want to suggest a new initiative?</p>
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-icon">📧</span>
            <span>info@jamiifund.org</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📱</span>
            <span>+254 700 000 000</span>
          </div>
        </div>
        <a href="/" class="cta-button">Start Donating Today</a>
      </div>
    </section>
  </div>
</div>

<style>
  .about-page {
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .hero {
    background: linear-gradient(135deg, #1E40AF 0%, #059669 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }

  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .section {
    padding: 4rem 0;
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #1E40AF;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .text-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #1E40AF;
  }

  .text-content p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #64748B;
    margin-bottom: 1.5rem;
  }

  .image-placeholder {
    height: 300px;
    background: #F8FAFC;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #e2e8f0;
  }

  .placeholder-content {
    text-align: center;
  }

  .placeholder-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .value-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .value-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .value-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #1E40AF;
  }

  .value-card p {
    color: #64748B;
    line-height: 1.6;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .step {
    text-align: center;
  }

  .step-number {
    width: 60px;
    height: 60px;
    background: #FB923C;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 1rem;
  }

  .step h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #1E40AF;
  }

  .step p {
    color: #64748B;
    line-height: 1.6;
  }

  .contact-section {
    background: #F8FAFC;
    padding: 3rem;
    border-radius: 12px;
    text-align: center;
  }

  .contact-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #1E40AF;
  }

  .contact-section p {
    font-size: 1.1rem;
    color: #64748B;
    margin-bottom: 2rem;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: #1E40AF;
  }

  .contact-icon {
    font-size: 1.25rem;
  }

  .cta-button {
    display: inline-block;
    background: #FB923C;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s;
  }

  .cta-button:hover {
    background: #ea7c1f;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .content-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .contact-info {
      flex-direction: column;
      gap: 1rem;
    }

    .section {
      padding: 2rem 0;
    }
  }
</style>
