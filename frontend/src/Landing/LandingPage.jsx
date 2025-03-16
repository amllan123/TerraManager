import React, { useState } from "react";
import "./landing.css";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

// Import custom placeholder components
import {
  DashboardPreview,
  AwsLogo,
  AzureLogo,
  GcpLogo,
  UserAvatar,
} from "./PlaceholderImage";

// SVG Icons
const CloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
  </svg>
);

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ServerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
    <line x1="6" x2="6.01" y1="6" y2="6"></line>
    <line x1="6" x2="6.01" y1="18" y2="18"></line>
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

// Google icon
const GoogleIcon = () => (
  <div
    style={{
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "white",
      borderRadius: "50%",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#4285F4",
    }}
  >
    G
  </div>
);

// GitHub icon alt
const GitHubIconAlt = () => (
  <div
    style={{
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "white",
      borderRadius: "50%",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    }}
  >
    <GitHubIcon />
  </div>
);

// Landing Page Component
const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'
  const [loggedIn, setLoggedIn] = useState(false);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setShowAuthModal(false);
    // In a real app, you'd handle authentication here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setShowAuthModal(false);
    // In a real app, you'd handle registration here
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  // If logged in, show the main application
  if (loggedIn) {
    return <IAC_Platform onLogout={handleLogout} />;
  }

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <a href="#" className="logo">
          <span className="logo-icon">
            <CloudIcon />
          </span>
          TerraManager
        </a>

        <nav className="nav-links">
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#providers" className="nav-link">
            Cloud Providers
          </a>
          <a href="#how-it-works" className="nav-link">
            How It Works
          </a>
          <a href="#testimonials" className="nav-link">
            Testimonials
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="btn btn-outline"
            onClick={() => handleOpenAuth("login")}
          >
            Login
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenAuth("register")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Infrastructure as Code Made Simple</h1>
          <p className="hero-subtitle">
            TerraManager is a user-friendly web platform that simplifies the
            management of your cloud infrastructure using Terraform. Search,
            create, and manage resources across AWS, Azure, and GCP with ease.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-light"
              onClick={() => handleOpenAuth("register")}
            >
              Get Started
            </button>
            <a href="#how-it-works" className="btn btn-transparent">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-image">
        <Terminal className="bg-black">
  <TypingAnimation>&gt; Terraform Workflow</TypingAnimation>

  <AnimatedSpan delay={1500} className="text-green-500">
    <span>✔ terraform init</span>
  </AnimatedSpan>

  <AnimatedSpan delay={2000} className="text-green-500">
    <span>✔ terraform fmt</span>
  </AnimatedSpan>

  <AnimatedSpan delay={2500} className="text-green-500">
    <span>✔ terraform validate</span>
  </AnimatedSpan>

  <AnimatedSpan delay={3000} className="text-green-500">
    <span>✔ terraform plan</span>
  </AnimatedSpan>

  <AnimatedSpan delay={3500} className="text-green-500">
    <span>✔ terraform apply -auto-approve</span>
  </AnimatedSpan>

  <AnimatedSpan delay={4000} className="text-green-500">
    <span>✔ Fetching Terraform state...</span>
  </AnimatedSpan>

  <AnimatedSpan delay={4500} className="text-green-500">
    <span>✔ terraform state list</span>
  </AnimatedSpan>

  <AnimatedSpan delay={5000} className="text-green-500">
    <span>✔ terraform output</span>
  </AnimatedSpan>

  <AnimatedSpan delay={5500} className="text-green-500">
    <span>✔ Checking for drift...</span>
  </AnimatedSpan>

  <AnimatedSpan delay={6000} className="text-green-500">
    <span>✔ terraform destroy -auto-approve</span>
  </AnimatedSpan>

  <TypingAnimation delay={6500} className="text-blue-500">
    Success! Terraform execution completed 🎉.
  </TypingAnimation>

  <TypingAnimation delay={7000} className="text-muted-foreground">
    Infrastructure is now provisioned.
  </TypingAnimation>
</Terminal>

        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Our platform provides a powerful yet intuitive interface to manage
            your infrastructure, with built-in security and cost optimization.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <ServerIcon />
            </div>
            <h3 className="feature-title">Simplified Resource Management</h3>
            <p className="feature-description">
              Create and manage cloud resources with a user-friendly interface.
              No need to write complex Terraform code manually. Search for the
              resources you need, configure them through intuitive forms, and
              deploy them with just a few clicks.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CodeIcon />
            </div>
            <h3 className="feature-title">Terraform Backend</h3>
            <p className="feature-description">
              Our platform leverages Terraform's power behind the scenes. We
              store your infrastructure code and state files in a secure
              database, making it easy to manage your deployments without
              dealing with state file complexities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <LockIcon />
            </div>
            <h3 className="feature-title">Secure Credentials</h3>
            <p className="feature-description">
              We securely handle your cloud provider credentials. Your access
              keys are encrypted, and you can easily manage different credential
              sets for various environments or projects.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ChartIcon />
            </div>
            <h3 className="feature-title">Cost Estimation</h3>
            <p className="feature-description">
              Get real-time cost estimations before deploying your
              infrastructure. Monitor your ongoing cloud spending and identify
              opportunities for optimization.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldIcon />
            </div>
            <h3 className="feature-title">Security & Compliance</h3>
            <p className="feature-description">
              Built-in best practices ensure your infrastructure follows
              security guidelines. Detect potential misconfigurations and
              compliance issues before deploying.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CloudIcon />
            </div>
            <h3 className="feature-title">Multi-Cloud Support</h3>
            <p className="feature-description">
              Currently supporting AWS, with Azure and GCP coming soon. Manage
              resources across different cloud providers with a consistent
              interface and workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section className="providers" id="providers">
        <div className="section-header">
          <h2 className="section-title">Supported Cloud Providers</h2>
          <p className="section-subtitle">
            We're continuously expanding our cloud provider support to help you
            manage your multi-cloud infrastructure.
          </p>
        </div>

        <div className="providers-grid">
          <div className="provider-card active flex items-center flex-col gap-2">
            <img src="/assets/aws.png" height={80} width={80} />
            <h3 className="provider-name">Amazon Web Services</h3>
            <p>
              Full support for AWS services including VPC, EC2, EKS, RDS, and
              more. Create and manage your AWS infrastructure with ease.
            </p>
            <span className="provider-status status-active">Available Now</span>
          </div>

          <div className="provider-card coming-soon flex items-center flex-col gap-2">
            <img src="/assets/azure.png" height={80} width={80} />
            <h3 className="provider-name">Microsoft Azure</h3>
            <p>
              Coming soon with support for Virtual Networks, Virtual Machines,
              AKS, SQL Database, and other Azure services.
            </p>
            <span className="provider-status status-coming">Coming Soon</span>
          </div>

          <div className="provider-card coming-soon flex items-center flex-col gap-2">
            <img src="/assets/gcp.png" height={80} width={80} />
            <h3 className="provider-name">Google Cloud Platform</h3>
            <p>
              Coming soon with support for VPC, Compute Engine, GKE, Cloud SQL,
              and other GCP services.
            </p>
            <span className="provider-status status-coming">Coming Soon</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2 className="section-title">How TerraManager Works</h2>
          <p className="section-subtitle">
            Our platform simplifies the infrastructure creation and management
            process with an intuitive workflow.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Search & Select Resources</h3>
              <p className="step-description">
                Browse our catalog of infrastructure resources. Find what you
                need with our powerful search functionality. Select the resource
                type you want to create, such as VPC, EC2, RDS, or EKS.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Configure With Forms</h3>
              <p className="step-description">
                Configure your resources using our intuitive forms. Set
                parameters like CIDR blocks, instance types, availability zones,
                and more. No need to write complex Terraform code.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Deploy With One Click</h3>
              <p className="step-description">
                Click "Create" and let our backend handle the rest. We generate
                the Terraform configuration, inject your parameters, and run the
                scripts with your AWS credentials.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3 className="step-title">Manage & Monitor</h3>
              <p className="step-description">
                View all your deployed resources in one place. Get detailed
                information, modify configurations, or destroy resources when no
                longer needed. Monitor costs and usage in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="section-header">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            TerraManager is trusted by DevOps teams, cloud engineers, and
            organizations of all sizes.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              TerraManager has dramatically simplified our AWS infrastructure
              management. What used to take hours of writing Terraform code now
              takes minutes with their intuitive UI.
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <UserAvatar name="Sarah Johnson" />
              </div>
              <div className="author-info">
                <div className="author-name">Sarah Johnson</div>
                <div className="author-title">DevOps Lead, TechCorp</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              As someone with limited Terraform experience, this platform has
              been a game-changer for me. I can now deploy and manage
              infrastructure without having to learn complex HCL syntax.
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <UserAvatar name="Michael Chen" />
              </div>
              <div className="author-info">
                <div className="author-name">Michael Chen</div>
                <div className="author-title">
                  Full Stack Developer, StartUp Inc.
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              The cost estimation feature has saved us thousands of dollars.
              Being able to see the cost impact before deployment is incredibly
              valuable for our budget planning.
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <UserAvatar name="Alex Rodriguez" />
              </div>
              <div className="author-info">
                <div className="author-name">Alex Rodriguez</div>
                <div className="author-title">CTO, Cloud Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2 className="cta-title">
          Ready to Simplify Your Infrastructure Management?
        </h2>
        <p className="cta-subtitle">
          Join thousands of teams who are saving time and reducing complexity
          with TerraManager. Get started for free today.
        </p>
        <div className="cta-actions">
          <button
            className="btn btn-light"
            onClick={() => handleOpenAuth("register")}
          >
            Sign Up Free
          </button>
          <button className="btn btn-transparent">Request Demo</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <CloudIcon /> TerraManager
            </div>
            <p className="footer-description">
              Simplifying Infrastructure as Code management with an intuitive,
              powerful platform.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <TwitterIcon />
              </a>
              <a href="#" className="social-link">
                <FacebookIcon />
              </a>
              <a href="#" className="social-link">
                <LinkedInIcon />
              </a>
              <a href="#" className="social-link">
                <GitHubIcon />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Product</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="#">Features</a>
              </li>
              <li className="footer-link">
                <a href="#">Pricing</a>
              </li>
              <li className="footer-link">
                <a href="#">Roadmap</a>
              </li>
              <li className="footer-link">
                <a href="#">Beta Program</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Resources</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="#">Documentation</a>
              </li>
              <li className="footer-link">
                <a href="#">API Reference</a>
              </li>
              <li className="footer-link">
                <a href="#">Blog</a>
              </li>
              <li className="footer-link">
                <a href="#">Community</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Company</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="#">About Us</a>
              </li>
              <li className="footer-link">
                <a href="#">Careers</a>
              </li>
              <li className="footer-link">
                <a href="#">Contact</a>
              </li>
              <li className="footer-link">
                <a href="#">Legal</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} TerraManager. All rights reserved.
        </div>
      </footer>

      {/* Auth Modal */}
      {/* {showAuthModal && (
        <div className="auth-modal" onClick={handleCloseAuth}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-tabs">
              <div 
                className={`modal-tab ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => setAuthMode('login')}
              >
                Login
              </div>
              <div 
                className={`modal-tab ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => setAuthMode('register')}
              >
                Register
              </div>
            </div>
            
            <div className="modal-content">
              {authMode === 'login' ? (
                <form className="auth-form" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="******" 
                      required 
                    />
                  </div>
                  
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  
                  <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                  </div>
                  
                  <button type="submit" className="btn btn-primary form-submit">Login</button>
                  
                  <div className="social-login">
                    <div className="social-login-divider">
                      <span>Or continue with</span>
                    </div>
                    
                    <div className="social-login-buttons">
                      <button type="button" className="social-login-btn">
                        <GoogleIcon />
                      </button>
                      <button type="button" className="social-login-btn">
                        <GitHubIconAlt />
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-footer">
                    Don't have an account? <a href="#" onClick={() => setAuthMode('register')}>Sign up</a>
                  </div>
                </form>
              ) : (
                <form className="auth-form" onSubmit={handleRegister}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="John" 
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Doe" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="******" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="******" 
                      required 
                    />
                  </div>
                  
                  <div className="remember-me">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary form-submit">Create Account</button>
                  
                  <div className="social-login">
                    <div className="social-login-divider">
                      <span>Or sign up with</span>
                    </div>
                    
                    <div className="social-login-buttons">
                      <button type="button" className="social-login-btn">
                        <GoogleIcon />
                      </button>
                      <button type="button" className="social-login-btn">
                        <GitHubIconAlt />
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-footer">
                    Already have an account? <a href="#" onClick={() => setAuthMode('login')}>Log in</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default LandingPage;
