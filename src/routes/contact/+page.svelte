<svelte:head>
  <title>Contact Us - JamiiFund</title>
  <meta name="description" content="Get in touch with JamiiFund. Contact us for questions about donations, projects, or partnership opportunities." />
</svelte:head>

<div class="contact-page">
  <div class="container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Contact Us</h1>
        <p class="hero-subtitle">
          Have questions? We'd love to hear from you. Get in touch with our team.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="contact-grid">
        <!-- Contact Information -->
        <div class="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Whether you have questions about our projects, need help with donations, 
            or want to suggest a new initiative, we're here to help.
          </p>

          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">📧</div>
              <div class="method-content">
                <h3>Email</h3>
                <p>info@jamiifund.org</p>
                <small>We'll respond within 24 hours</small>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">📱</div>
              <div class="method-content">
                <h3>Phone</h3>
                <p>+254 700 000 000</p>
                <small>Monday - Friday, 9AM - 5PM EAT</small>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">📍</div>
              <div class="method-content">
                <h3>Address</h3>
                <p>Nairobi, Kenya</p>
                <small>Visit by appointment only</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-section">
          <h2>Send us a Message</h2>
          <form class="contact-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" required>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <select id="subject" name="subject" required>
                <option value="">Select a topic</option>
                <option value="donation">Donation Questions</option>
                <option value="project">Project Suggestions</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="technical">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="5" required placeholder="Tell us how we can help you..."></textarea>
            </div>

            <button type="submit" class="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3>How do I make a donation?</h3>
          <p>Simply browse our projects, select one you'd like to support, enter your donation amount and phone number, then complete the payment via Mpesa.</p>
        </div>

        <div class="faq-item">
          <h3>Are donations really anonymous?</h3>
          <p>Yes! We don't require any personal information beyond your phone number for payment processing, which is not stored or shared.</p>
        </div>

        <div class="faq-item">
          <h3>How do I know my donation is being used properly?</h3>
          <p>All project progress is tracked and updated regularly. You can see how much has been raised and how funds are being used.</p>
        </div>

        <div class="faq-item">
          <h3>Can I suggest a new project?</h3>
          <p>Absolutely! Use the contact form above or email us directly with your project suggestion. We review all submissions carefully.</p>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .contact-page {
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

  .contact-content {
    padding: 4rem 0;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }

  .contact-info h2,
  .contact-form-section h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #1E40AF;
  }

  .contact-info p {
    font-size: 1.1rem;
    color: #64748B;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .contact-method {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .method-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    background: #F8FAFC;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .method-content h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #1E40AF;
  }

  .method-content p {
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 0.25rem;
  }

  .method-content small {
    color: #64748B;
  }

  .contact-form {
    background: #F8FAFC;
    padding: 2rem;
    border-radius: 12px;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1E40AF;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: #FB923C;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-btn:hover {
    background: #ea7c1f;
  }

  .faq-section {
    padding: 4rem 0;
    background: #F8FAFC;
  }

  .faq-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #1E40AF;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .faq-item {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .faq-item h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #1E40AF;
  }

  .faq-item p {
    color: #64748B;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .contact-methods {
      gap: 1.5rem;
    }

    .contact-method {
      flex-direction: column;
      text-align: center;
    }

    .faq-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
