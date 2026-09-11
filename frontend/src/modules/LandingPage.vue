<template>
  <div class="landing-page">
    <!-- =========================================================
         1. SITE HEADER (STICKY / GLASSMORPHIC)
    ========================================================== -->
    <header class="site-header" :class="{ scrolled }">
      <div class="header-container">
        <!-- Logo -->
        <a href="#home" class="brand">
          <div class="brand-badge">T</div>
          <span class="brand-text">TCOS</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a href="#product" class="nav-link">
            Product <ChevronDown :size="13" class="chevron" />
          </a>
          <a href="#features" class="nav-link">Features</a>
          <a href="#pricing" class="nav-link">Pricing</a>
          <a href="#resources" class="nav-link">
            Resources <ChevronDown :size="13" class="chevron" />
          </a>
        </nav>

        <!-- Header Actions -->
        <div class="nav-actions">
          <router-link to="/login" class="btn btn-outline-nav">Sign in</router-link>
          <a href="#pricing" class="btn btn-primary-nav">Start Free</a>

          <!-- Mobile Hamburger -->
          <button
            class="mobile-toggle"
            @click="mobileOpen = !mobileOpen"
            :aria-expanded="mobileOpen"
            aria-label="Toggle navigation"
          >
            <X v-if="mobileOpen" :size="20" />
            <Menu v-else :size="20" />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <transition name="slide-down">
        <div v-if="mobileOpen" class="mobile-menu">
          <a href="#product" @click="mobileOpen = false">Product</a>
          <a href="#features" @click="mobileOpen = false">Features</a>
          <a href="#pricing" @click="mobileOpen = false">Pricing</a>
          <a href="#resources" @click="mobileOpen = false">Resources</a>
          <div class="mobile-actions">
            <router-link to="/login" class="btn btn-outline-nav" @click="mobileOpen = false">
              Sign in
            </router-link>
            <a href="#pricing" class="btn btn-primary-nav" @click="mobileOpen = false">
              Start Free
            </a>
          </div>
        </div>
      </transition>
    </header>

    <main>
      <!-- =========================================================
           2. HERO SECTION
      ========================================================== -->
      <section id="home" class="hero-section">
        <!-- Ambient Glowing Orbs -->
        <div class="ambient-glow glow-hero-left"></div>
        <div class="ambient-glow glow-hero-right"></div>

        <div class="hero-container">
          <!-- Left Column (45%): Headline & Value Prop -->
          <div class="hero-left">
            <!-- Eyebrow Pill -->
            <div class="eyebrow-badge">
              <Sparkles :size="13" class="eyebrow-icon" />
              <span>The All-in-One Creator Operating System</span>
            </div>

            <!-- Big Headline -->
            <h1 class="hero-headline">
              <span class="word-create">Create.</span>
              <span class="word-edit"> Edit.</span>
              <span class="word-publish"> Publish.</span>
              <span class="word-grow"> Grow. </span>
              <br class="desktop-break" />
              <span class="word-all"> All </span>
              <span class="word-highlight">in One Place.</span>
            </h1>

            <!-- Subtitle -->
            <p class="hero-description">
              TCOS (Total Creator Operating System) helps you turn ideas into
              impact. Plan, create, edit, schedule, publish, and analyze your
              content — powered by real AI and real integrations.
            </p>

            <!-- Buttons Row -->
            <div class="hero-cta-group">
              <a href="#pricing" class="btn btn-hero-primary">
                Start Free Today
                <ArrowRight :size="16" class="btn-arrow" />
              </a>
              <a href="#product" class="btn btn-hero-secondary">
                <div class="play-icon-circle">
                  <Play :size="11" fill="currentColor" />
                </div>
                Watch Demo
              </a>
            </div>

            <!-- Trust Row -->
            <div class="hero-trust-row">
              <div class="avatar-stack">
                <div class="avatar-circle av-1">G</div>
                <div class="avatar-circle av-2">A</div>
                <div class="avatar-circle av-3">R</div>
                <div class="avatar-circle av-4">M</div>
              </div>
              <p class="trust-text">
                Trusted by <strong>20,000+</strong> creators, agencies, and businesses
              </p>
            </div>
          </div>

          <!-- Right Column (55%): Realistic High-End Dashboard Mockup -->
          <div class="hero-right">
            <div class="dashboard-window">
              <!-- Window Top Bar -->
              <div class="dash-window-bar">
                <div class="dash-window-left">
                  <div class="mini-brand-badge">T</div>
                  <span class="mini-brand-name">TCOS</span>
                </div>
                <div class="dash-window-center">
                  <div class="dash-search-pill">
                    <Search :size="11" />
                    <span>Search workspace...</span>
                  </div>
                </div>
                <div class="dash-window-dots">
                  <span class="dot dot-close"></span>
                  <span class="dot dot-min"></span>
                  <span class="dot dot-expand"></span>
                </div>
              </div>

              <!-- Dashboard Body (Sidebar + Content) -->
              <div class="dash-window-body">
                <!-- Mini Sidebar -->
                <aside class="dash-sidebar">
                  <div class="dash-nav-item active">
                    <LayoutDashboard :size="13" />
                    <span>Dashboard</span>
                  </div>
                  <div class="dash-nav-item">
                    <Bot :size="13" />
                    <span>AI Creator</span>
                  </div>
                  <div class="dash-nav-item">
                    <FileText :size="13" />
                    <span>Content</span>
                  </div>
                  <div class="dash-nav-item">
                    <Film :size="13" />
                    <span>Editing Studio</span>
                  </div>
                  <div class="dash-nav-item">
                    <Calendar :size="13" />
                    <span>Scheduling</span>
                  </div>
                  <div class="dash-nav-item">
                    <BarChart3 :size="13" />
                    <span>Analytics</span>
                  </div>
                  <div class="dash-nav-item">
                    <Image :size="13" />
                    <span>Asset Library</span>
                  </div>
                  <div class="dash-nav-item">
                    <FolderOpen :size="13" />
                    <span>Projects</span>
                  </div>
                  <div class="dash-nav-item">
                    <Settings :size="13" />
                    <span>Settings</span>
                  </div>
                </aside>

                <!-- Main Content Area -->
                <div class="dash-main-area">
                  <!-- Greeting Row -->
                  <div class="dash-greeting-row">
                    <div>
                      <span class="dash-date-badge">Tuesday, September 9</span>
                      <h3 class="dash-greeting-title">Good morning, Creator!</h3>
                    </div>
                    <button class="dash-new-btn">
                      <Plus :size="12" />
                      New Project
                    </button>
                  </div>

                  <!-- 4 Quick Cards Row -->
                  <div class="dash-quick-cards">
                    <div class="dash-qcard">
                      <div class="qcard-icon-wrap q-purple">
                        <Sparkles :size="13" />
                      </div>
                      <div class="qcard-text">
                        <strong>Create with AI</strong>
                        <small>Generate content</small>
                      </div>
                    </div>
                    <div class="dash-qcard">
                      <div class="qcard-icon-wrap q-blue">
                        <Film :size="13" />
                      </div>
                      <div class="qcard-text">
                        <strong>Edit Media</strong>
                        <small>Edit your media</small>
                      </div>
                    </div>
                    <div class="dash-qcard">
                      <div class="qcard-icon-wrap q-orange">
                        <Globe :size="13" />
                      </div>
                      <div class="qcard-text">
                        <strong>Schedule Post</strong>
                        <small>Publish anywhere</small>
                      </div>
                    </div>
                    <div class="dash-qcard">
                      <div class="qcard-icon-wrap q-green">
                        <BarChart3 :size="13" />
                      </div>
                      <div class="qcard-text">
                        <strong>View Analytics</strong>
                        <small>Track performance</small>
                      </div>
                    </div>
                  </div>

                  <!-- Recent Projects Header -->
                  <div class="dash-projects-header">
                    <strong>Recent Projects</strong>
                    <span class="view-all-link">View all</span>
                  </div>

                  <!-- 3 Project Cards Grid -->
                  <div class="dash-projects-grid">
                    <!-- Project 1: Mountain Sunset Landscape -->
                    <div class="dash-project-card">
                      <div class="project-preview preview-mountain">
                        <div class="proj-badge badge-new">NEW</div>
                        <!-- Mini Scenic Landscape -->
                        <div class="scene-landscape">
                          <div class="scene-sky"></div>
                          <div class="scene-sun"></div>
                          <div class="scene-mountain m-back"></div>
                          <div class="scene-mountain m-front"></div>
                          <div class="scene-lake"></div>
                        </div>
                      </div>
                      <div class="project-info">
                        <strong>Product Launch</strong>
                        <small>Video · 12 min ago</small>
                      </div>
                    </div>

                    <!-- Project 2: Ocean Wave Reel -->
                    <div class="dash-project-card">
                      <div class="project-preview preview-ocean">
                        <div class="proj-badge badge-reel">REEL</div>
                        <div class="scene-ocean">
                          <div class="ocean-sky"></div>
                          <div class="ocean-sun"></div>
                          <div class="ocean-wave w-1"></div>
                          <div class="ocean-wave w-2"></div>
                        </div>
                      </div>
                      <div class="project-info">
                        <strong>Travel Vlog</strong>
                        <small>Reel · 2 hours ago</small>
                      </div>
                    </div>

                    <!-- Project 3: Cyber City Short -->
                    <div class="dash-project-card">
                      <div class="project-preview preview-city">
                        <div class="proj-badge badge-short">SHORT</div>
                        <div class="scene-city">
                          <div class="city-sky"></div>
                          <div class="city-building b-1"></div>
                          <div class="city-building b-2"></div>
                          <div class="city-building b-3"></div>
                          <div class="city-neon"></div>
                        </div>
                      </div>
                      <div class="project-info">
                        <strong>Creator Tips</strong>
                        <small>Short · Yesterday</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Analytics Badge (Total Views 2.4M + Glowing Chart) -->
            <div class="floating-analytics-card">
              <span class="analytics-label">Total Views</span>
              <div class="analytics-stat-row">
                <span class="analytics-number">2.4M</span>
                <span class="analytics-up-pill">
                  <TrendingUp :size="12" />
                  12%
                </span>
              </div>
              <!-- Smooth Neon Green SVG Curve Sparkline -->
              <div class="sparkline-wrapper">
                <svg viewBox="0 0 190 44" class="sparkline-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35" />
                      <stop offset="100%" stop-color="#22c55e" stop-opacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,34 Q 25,32 45,36 T 85,24 T 125,18 T 160,8 L 190,4 L 190,44 L 0,44 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M 0,34 Q 25,32 45,36 T 85,24 T 125,18 T 160,8 L 190,4"
                    fill="none"
                    stroke="#22c55e"
                    stroke-width="2.6"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- =========================================================
             3. PLATFORMS BAR (ECOSYSTEM TRUST BAR)
        ========================================================== -->
        <div class="platform-bar-section">
          <p class="platform-title">Create content for all major platforms</p>
          <div class="platform-icons-row">
            <!-- YouTube -->
            <div class="platform-pill" title="YouTube">
              <div class="plat-logo plat-youtube">
                <Youtube :size="17" />
              </div>
            </div>

            <!-- Instagram -->
            <div class="platform-pill" title="Instagram">
              <div class="plat-logo plat-instagram">
                <Instagram :size="16" />
              </div>
            </div>

            <!-- TikTok -->
            <div class="platform-pill" title="TikTok">
              <div class="plat-logo plat-tiktok">
                <Music :size="15" />
              </div>
            </div>

            <!-- LinkedIn -->
            <div class="platform-pill" title="LinkedIn">
              <div class="plat-logo plat-linkedin">
                <Linkedin :size="15" />
              </div>
            </div>

            <!-- Facebook -->
            <div class="platform-pill" title="Facebook">
              <div class="plat-logo plat-facebook">
                <Facebook :size="16" />
              </div>
            </div>

            <!-- X / Twitter -->
            <div class="platform-pill" title="X (Twitter)">
              <div class="plat-logo plat-x">
                <Twitter :size="15" />
              </div>
            </div>

            <!-- Threads -->
            <div class="platform-pill" title="Threads">
              <div class="plat-logo plat-threads">
                <AtSign :size="15" />
              </div>
            </div>

            <!-- Pinterest -->
            <div class="platform-pill" title="Pinterest">
              <div class="plat-logo plat-pinterest">
                <Palette :size="15" />
              </div>
            </div>

            <!-- Reddit -->
            <div class="platform-pill" title="Reddit">
              <div class="plat-logo plat-reddit">
                <MessageSquare :size="15" />
              </div>
            </div>

            <span class="platforms-more">and more...</span>
          </div>
        </div>
      </section>

      <!-- =========================================================
           4. FEATURES SECTION (4 COLS × 2 ROWS)
      ========================================================== -->
      <section id="features" class="section features-section">
        <div class="container">
          <!-- Section Heading -->
          <div class="section-heading-centered">
            <span class="section-eyebrow">EVERYTHING YOU NEED</span>
            <h2 class="section-title">A Complete Creator Workflow</h2>
            <p class="section-subtitle">
              From idea to analytics, TCOS gives you all the tools to create, manage, and
              grow your content — without switching between multiple apps.
            </p>
          </div>

          <!-- 4x2 Feature Grid -->
          <div class="feature-grid-4x2">
            <article
              v-for="feat in features"
              :key="feat.title"
              class="feature-card"
            >
              <div class="feature-icon-box" :class="feat.colorClass">
                <component :is="feat.icon" :size="20" />
              </div>
              <h3 class="feature-title">{{ feat.title }}</h3>
              <p class="feature-desc">{{ feat.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- =========================================================
           5. PRODUCT SHOWCASE (EDITING STUDIO)
      ========================================================== -->
      <section id="product" class="section showcase-section">
        <div class="ambient-glow glow-showcase"></div>

        <div class="container showcase-grid">
          <!-- Left: Realistic Editing Studio UI Mockup -->
          <div class="showcase-mockup-wrapper">
            <div class="editor-window">
              <!-- Window Bar -->
              <div class="editor-titlebar">
                <div class="editor-titlebar-left">
                  <div class="editor-app-icon">
                    <Film :size="12" />
                  </div>
                  <strong class="editor-app-name">Editing Studio</strong>
                </div>
                <div class="editor-save-badge">
                  <Check :size="12" class="check-icon" />
                  <span>Autosaved</span>
                </div>
              </div>

              <!-- Editor Workspace -->
              <div class="editor-layout">
                <!-- Left Strip: Media Asset Clips -->
                <div class="editor-asset-strip">
                  <div class="asset-thumb thumb-sunset active" title="Clip 1"></div>
                  <div class="asset-thumb thumb-ocean" title="Clip 2"></div>
                  <div class="asset-thumb thumb-city" title="Clip 3"></div>
                  <div class="asset-thumb thumb-nature" title="Clip 4"></div>
                </div>

                <!-- Center Canvas & Timeline -->
                <div class="editor-center-canvas">
                  <!-- Video Viewport -->
                  <div class="editor-video-preview">
                    <!-- Scenic Mountain Sunset Video Frame -->
                    <div class="video-scenic-frame">
                      <div class="scenic-sky"></div>
                      <div class="scenic-sun"></div>
                      <div class="scenic-mountain-back"></div>
                      <div class="scenic-mountain-front"></div>
                      <div class="scenic-lake">
                        <div class="scenic-lake-reflection"></div>
                      </div>
                    </div>

                    <!-- Floating AI Tools Panel -->
                    <div class="editor-ai-float">
                      <div class="ai-panel-header">
                        <Sparkles :size="11" />
                        <span>AI TOOLS</span>
                      </div>
                      <div class="ai-tools-list">
                        <button class="ai-tool-item">
                          <span class="ai-star">✦</span>
                          Auto Cut
                        </button>
                        <button class="ai-tool-item">
                          <span class="ai-star">✦</span>
                          Remove Background
                        </button>
                        <button class="ai-tool-item">
                          <span class="ai-star">✦</span>
                          Generate Subtitles
                        </button>
                        <button class="ai-tool-item">
                          <span class="ai-star">✦</span>
                          Enhance Audio
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Timeline Tracks -->
                  <div class="editor-timeline">
                    <div class="timeline-ruler">
                      <span>00:00</span>
                      <span>00:15</span>
                      <span>00:30</span>
                      <span>00:45</span>
                      <span>01:00</span>
                    </div>

                    <div class="timeline-track track-video">
                      <div class="track-block block-video" style="width: 62%;">
                        <Film :size="11" />
                        <span>Main_Footage.mp4</span>
                      </div>
                    </div>

                    <div class="timeline-track track-audio">
                      <div class="track-block block-audio" style="width: 48%;">
                        <Music :size="11" />
                        <span>Audio_Voiceover.wav</span>
                      </div>
                    </div>

                    <div class="timeline-track track-subtitles">
                      <div class="track-block block-subtitles" style="width: 76%;">
                        <Type :size="11" />
                        <span>AI_Subtitles_EN.srt</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Value Proposition & Feature List -->
          <div class="showcase-content">
            <span class="section-eyebrow eyebrow-showcase">
              <Sparkles :size="13" class="eyebrow-icon" />
              POWERFUL EDITING
            </span>

            <h2 class="showcase-headline">
              Create Stunning Content with AI-Powered Tools
            </h2>

            <p class="showcase-description">
              Edit faster, create better, and let AI handle the heavy lifting. From
              auto-cut to subtitles, TCOS helps you produce professional content in minutes.
            </p>

            <ul class="showcase-checklist">
              <li v-for="item in editingFeatures" :key="item">
                <div class="check-circle-icon">
                  <Check :size="13" />
                </div>
                <span>{{ item }}</span>
              </li>
            </ul>

            <a href="#product" class="btn btn-showcase-cta">
              Explore Editing Studio
              <ArrowRight :size="15" />
            </a>
          </div>
        </div>
      </section>

      <!-- =========================================================
           6. TESTIMONIALS SECTION
      ========================================================== -->
      <section id="resources" class="section testimonials-section">
        <div class="container">
          <div class="section-heading-centered">
            <span class="section-eyebrow">LOVED BY CREATORS</span>
            <h2 class="section-title">What Our Users Say</h2>
            <p class="section-subtitle">
              Join thousands of creators who are already growing with TCOS.
            </p>
          </div>

          <div class="testimonials-grid">
            <article
              v-for="item in testimonials"
              :key="item.name"
              class="testimonial-card"
              :class="{ 'card-highlighted': item.highlighted }"
            >
              <div class="testimonial-quote-mark">“</div>
              <p class="testimonial-quote">{{ item.quote }}</p>

              <div class="testimonial-author-row">
                <div class="author-avatar" :class="item.avatarClass">
                  {{ item.avatar }}
                </div>
                <div class="author-details">
                  <strong class="author-name">{{ item.name }}</strong>
                  <small class="author-role">{{ item.role }}</small>
                </div>
              </div>

              <!-- 5 Stars Rating -->
              <div class="star-rating-row">
                <Star
                  v-for="s in 5"
                  :key="s"
                  :size="14"
                  fill="#FBBF24"
                  color="#FBBF24"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- =========================================================
           7. PRICING SECTION
      ========================================================== -->
      <section id="pricing" class="section pricing-section">
        <div class="container">
          <div class="section-heading-centered">
            <span class="section-eyebrow">SIMPLE PRICING</span>
            <h2 class="section-title">Choose Your Plan</h2>
            <p class="section-subtitle">Start free and upgrade as you grow.</p>

            <!-- Monthly / Yearly Billing Toggle -->
            <div class="billing-toggle-wrapper">
              <div class="billing-pill-container">
                <button
                  class="toggle-opt-btn"
                  :class="{ active: billing === 'monthly' }"
                  @click="billing = 'monthly'"
                >
                  Monthly
                </button>
                <button
                  class="toggle-opt-btn"
                  :class="{ active: billing === 'yearly' }"
                  @click="billing = 'yearly'"
                >
                  Yearly
                  <span class="save-badge">Save 20%</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 4 Pricing Cards -->
          <div class="pricing-grid-4">
            <article
              v-for="plan in activePlans"
              :key="plan.name"
              class="pricing-card"
              :class="{ 'featured-plan-card': plan.featured }"
            >
              <!-- Most Popular Badge -->
              <div v-if="plan.featured" class="most-popular-pill">
                Most Popular
              </div>

              <h3 class="plan-name">{{ plan.name }}</h3>

              <div class="plan-price-row">
                <span class="price-currency">$</span>
                <span class="price-amount">{{ plan.price }}</span>
                <span class="price-period">/ month</span>
              </div>

              <p class="plan-summary">{{ plan.description }}</p>

              <ul class="plan-features-list">
                <li v-for="f in plan.features" :key="f">
                  <Check :size="14" class="plan-check-icon" />
                  <span>{{ f }}</span>
                </li>
              </ul>

              <router-link
                to="/login"
                class="btn plan-cta-btn"
                :class="plan.featured ? 'btn-plan-featured' : 'btn-plan-regular'"
              >
                Get Started
              </router-link>
            </article>
          </div>
        </div>
      </section>

      <!-- =========================================================
           8. CTA BANNER SECTION
      ========================================================== -->
      <section class="section cta-banner-section">
        <div class="container">
          <div class="cta-banner-box">
            <div class="cta-banner-content">
              <span class="cta-eyebrow">READY TO GROW?</span>
              <h2 class="cta-headline">Start Your Creator Journey Today</h2>
              <p class="cta-subtitle">
                Join 20,000+ creators and turn your ideas into impact with TCOS.
              </p>
            </div>

            <router-link to="/login" class="btn btn-cta-primary">
              Get Started Free
              <ArrowRight :size="16" />
            </router-link>
          </div>
        </div>
      </section>

      <!-- =========================================================
           9. FAQ SECTION (2 COLUMNS)
      ========================================================== -->
      <section class="section faq-section">
        <div class="container">
          <div class="section-heading-centered">
            <span class="section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2 class="section-title">Got Questions?</h2>
            <p class="section-subtitle">
              Here are some of the most common questions about TCOS.
            </p>
          </div>

          <div class="faq-accordion-grid">
            <!-- Left Column -->
            <div class="faq-column">
              <article
                v-for="(item, idx) in faqLeft"
                :key="item.question"
                class="faq-item"
                :class="{ 'faq-open': openFaq === `left-${idx}` }"
              >
                <button
                  class="faq-header-btn"
                  @click="toggleFaq(`left-${idx}`)"
                  :aria-expanded="openFaq === `left-${idx}`"
                >
                  <span class="faq-question">{{ item.question }}</span>
                  <ChevronDown
                    :size="16"
                    class="faq-chevron"
                    :class="{ rotated: openFaq === `left-${idx}` }"
                  />
                </button>
                <div v-show="openFaq === `left-${idx}`" class="faq-body">
                  <p>{{ item.answer }}</p>
                </div>
              </article>
            </div>

            <!-- Right Column -->
            <div class="faq-column">
              <article
                v-for="(item, idx) in faqRight"
                :key="item.question"
                class="faq-item"
                :class="{ 'faq-open': openFaq === `right-${idx}` }"
              >
                <button
                  class="faq-header-btn"
                  @click="toggleFaq(`right-${idx}`)"
                  :aria-expanded="openFaq === `right-${idx}`"
                >
                  <span class="faq-question">{{ item.question }}</span>
                  <ChevronDown
                    :size="16"
                    class="faq-chevron"
                    :class="{ rotated: openFaq === `right-${idx}` }"
                  />
                </button>
                <div v-show="openFaq === `right-${idx}`" class="faq-body">
                  <p>{{ item.answer }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- =========================================================
         10. FOOTER (5 COLUMNS + BOTTOM BAR)
    ========================================================== -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-main-grid">
          <!-- Col 1: Brand & Tagline -->
          <div class="footer-col-brand">
            <a href="#home" class="brand">
              <div class="brand-badge">T</div>
              <span class="brand-text">TCOS</span>
            </a>
            <p class="footer-tagline">
              The complete operating system for modern creators.
            </p>
            <div class="footer-social-row">
              <a href="#home" class="social-btn" aria-label="YouTube">
                <Youtube :size="15" />
              </a>
              <a href="#home" class="social-btn" aria-label="Instagram">
                <Instagram :size="15" />
              </a>
              <a href="#home" class="social-btn" aria-label="TikTok">
                <Music :size="14" />
              </a>
              <a href="#home" class="social-btn" aria-label="LinkedIn">
                <Linkedin :size="14" />
              </a>
              <a href="#home" class="social-btn" aria-label="Twitter">
                <Twitter :size="14" />
              </a>
            </div>
          </div>

          <!-- Col 2: Product -->
          <div class="footer-col-nav">
            <h4 class="footer-heading">Product</h4>
            <ul class="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#product">Integrations</a></li>
              <li><a href="#product">Roadmap</a></li>
            </ul>
          </div>

          <!-- Col 3: Resources -->
          <div class="footer-col-nav">
            <h4 class="footer-heading">Resources</h4>
            <ul class="footer-links">
              <li><a href="#resources">Blog</a></li>
              <li><a href="#resources">Help Center</a></li>
              <li><a href="#resources">Documentation</a></li>
              <li><a href="#resources">Community</a></li>
            </ul>
          </div>

          <!-- Col 4: Company -->
          <div class="footer-col-nav">
            <h4 class="footer-heading">Company</h4>
            <ul class="footer-links">
              <li><a href="#home">About Us</a></li>
              <li><a href="#home">Careers</a></li>
              <li><a href="#home">Contact</a></li>
              <li><a href="#home">Privacy Policy</a></li>
              <li><a href="#home">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Col 5: Stay Updated (Newsletter) -->
          <div class="footer-col-newsletter">
            <h4 class="footer-heading">Stay Updated</h4>
            <p class="newsletter-sub">Get the latest news and updates.</p>
            <form class="newsletter-form" @submit.prevent="subscribe">
              <input
                v-model="email"
                type="email"
                placeholder="Your email"
                required
                class="newsletter-input"
              />
              <button type="submit" class="btn newsletter-submit-btn">
                Subscribe
              </button>
            </form>
            <span v-if="subscribed" class="newsletter-ok">
              ✓ Successfully subscribed!
            </span>
          </div>
        </div>

        <!-- Bottom Copyright Bar -->
        <div class="footer-bottom-bar">
          <span>© 2026 TCOS. All rights reserved.</span>
          <span class="built-with">
            Built for Creators, by Giraldo Nainggolan.
            <Heart :size="12" fill="#E253D8" color="#E253D8" class="heart-icon" />
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, type Component } from 'vue'
import faviconUrl from '@/assets/GN.png'
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  Play,
  TrendingUp,
  Check,
  Star,
  Heart,
  Instagram,
  Youtube,
  Music,
  Linkedin,
  Twitter,
  Facebook,
  AtSign,
  Palette,
  MessageSquare,
  LayoutDashboard,
  Bot,
  FileText,
  Film,
  Image,
  Calendar,
  BarChart3,
  FolderOpen,
  Settings,
  Users,
  Globe,
  Plus,
  Search,
  Type,
  Menu,
  X
} from 'lucide-vue-next'

/* =========================================================
   STATE
========================================================= */
const scrolled = ref(false)
const mobileOpen = ref(false)
const billing = ref<'monthly' | 'yearly'>('monthly')
const openFaq = ref<string | null>(null)
const email = ref('')
const subscribed = ref(false)

function toggleFaq(id: string) {
  openFaq.value = openFaq.value === id ? null : id
}

function subscribe() {
  subscribed.value = true
  email.value = ''
  setTimeout(() => {
    subscribed.value = false
  }, 4000)
}

function onScroll() {
  scrolled.value = window.scrollY > 15
}

onMounted(() => {
  // Enforce dark theme isolated to landing page
  document.title = 'TCOS | The Creator Operating System'
  document.documentElement.style.backgroundColor = '#060810'
  document.documentElement.style.colorScheme = 'dark'
  document.body.style.backgroundColor = '#060810'
  document.body.style.colorScheme = 'dark'
  document.documentElement.classList.add('dark')
  document.body.classList.add('dark')

  // Enforce GN.png as favicon
  const faviconLink = (document.querySelector("link[rel*='icon']") || document.createElement('link')) as HTMLLinkElement
  faviconLink.type = 'image/png'
  faviconLink.rel = 'icon'
  faviconLink.href = faviconUrl
  if (!faviconLink.parentNode) {
    document.head.appendChild(faviconLink)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  document.documentElement.style.backgroundColor = ''
  document.documentElement.style.colorScheme = ''
  document.body.style.backgroundColor = ''
  document.body.style.colorScheme = ''
  window.removeEventListener('scroll', onScroll)
})

/* =========================================================
   FEATURES DATA (4 COLS × 2 ROWS)
========================================================= */
interface FeatureItem {
  title: string
  description: string
  icon: Component
  colorClass: string
}

const features: FeatureItem[] = [
  {
    title: 'AI Assistant',
    description: 'Generate scripts, captions, ideas, and more with top AI models.',
    icon: Sparkles,
    colorClass: 'c-purple'
  },
  {
    title: 'Content System',
    description: 'Organize your ideas, scripts, and projects in one place.',
    icon: FileText,
    colorClass: 'c-blue'
  },
  {
    title: 'Editing Studio',
    description: 'Edit video and image with professional tools, powered by AI.',
    icon: Film,
    colorClass: 'c-green'
  },
  {
    title: 'Social Scheduling',
    description: 'Publish and schedule to multiple platforms from one workspace.',
    icon: Calendar,
    colorClass: 'c-orange'
  },
  {
    title: 'Analytics',
    description: 'Track performance and grow with data.',
    icon: BarChart3,
    colorClass: 'c-pink'
  },
  {
    title: 'Asset Library',
    description: 'Store and manage all your media assets securely.',
    icon: Image,
    colorClass: 'c-yellow'
  },
  {
    title: 'Team Collaboration',
    description: 'Work together with your team or clients.',
    icon: Users,
    colorClass: 'c-violet'
  },
  {
    title: 'Multi-Platform',
    description: 'Connect all your social accounts via Postiz.',
    icon: Globe,
    colorClass: 'c-cyan'
  }
]

/* =========================================================
   SHOWCASE CHECKLIST
========================================================= */
const editingFeatures = [
  'Multi-track video editor',
  'AI auto-cut & scene detection',
  'Automatic subtitles & translation',
  'Rich media library'
]

/* =========================================================
   TESTIMONIALS
========================================================= */
interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
  avatarClass: string
  highlighted?: boolean
}

const testimonials: Testimonial[] = [
  {
    quote:
      'TCOS has completely changed my workflow. I can create, edit, and publish without leaving the platform.',
    name: 'Sarah K.',
    role: 'Content Creator',
    avatar: 'S',
    avatarClass: 'av-purple'
  },
  {
    quote:
      'The AI tools are incredible. It saves me hours every week, and the analytics help me grow faster.',
    name: 'Rizal P.',
    role: 'Digital Marketer',
    avatar: 'R',
    avatarClass: 'av-blue',
    highlighted: true
  },
  {
    quote:
      'Finally, a tool that brings everything together. Perfect for my agency and clients.',
    name: 'Maya S.',
    role: 'Creative Agency Owner',
    avatar: 'M',
    avatarClass: 'av-violet'
  }
]

/* =========================================================
   PRICING
========================================================= */
interface Plan {
  name: string
  price: number
  description: string
  features: string[]
  featured?: boolean
}

const monthlyPlans: Plan[] = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '3 social accounts',
      '10 AI generations/month',
      'Basic editing tools',
      'Community support'
    ]
  },
  {
    name: 'Standard',
    price: 29,
    description: 'For individual creators',
    features: [
      '10 social accounts',
      '100 AI generations/month',
      'Advanced editing tools',
      'Analytics',
      'Email support'
    ]
  },
  {
    name: 'Team',
    price: 39,
    description: 'For small teams',
    featured: true,
    features: [
      '25 social accounts',
      'Unlimited AI generations',
      'Team collaboration',
      'Advanced analytics',
      'Priority support'
    ]
  },
  {
    name: 'Pro',
    price: 99,
    description: 'For agencies & businesses',
    features: [
      'Unlimited accounts',
      'Advanced AI models',
      'White-label options',
      'API access',
      'Dedicated support'
    ]
  }
]

const yearlyPlans: Plan[] = [
  { ...monthlyPlans[0], price: 0 },
  { ...monthlyPlans[1], price: 23 },
  { ...monthlyPlans[2], price: 31, featured: true },
  { ...monthlyPlans[3], price: 79 }
]

const activePlans = computed(() => (billing.value === 'monthly' ? monthlyPlans : yearlyPlans))

/* =========================================================
   FAQ
========================================================= */
const faqLeft = [
  {
    question: 'What is TCOS?',
    answer:
      'TCOS is an all-in-one creator operating system for planning, creating, editing, distributing, scheduling, and analyzing content.'
  },
  {
    question: 'Do I need technical skills to use TCOS?',
    answer:
      'No. TCOS is designed around a creator-first workflow and an intuitive, visual drag-and-drop interface.'
  },
  {
    question: 'Which social media platforms are supported?',
    answer:
      'TCOS is designed for multi-platform distribution including YouTube, Instagram, TikTok, LinkedIn, Facebook, X, Threads, and Pinterest.'
  },
  {
    question: 'Can I use my own AI API keys?',
    answer:
      'Yes. TCOS supports your own AI provider credentials (OpenAI, Claude, Gemini) as well as supported local AI connections.'
  }
]

const faqRight = [
  {
    question: 'Is there a free plan?',
    answer:
      'Yes. TCOS provides a Free plan forever for creators who want to start with the essential tools and 10 AI generations per month.'
  },
  {
    question: 'Can I collaborate with my team?',
    answer:
      'Yes. Workspace-based team collaboration with customizable roles and asset sharing is built right into the platform.'
  },
  {
    question: 'Is my data secure?',
    answer:
      'TCOS is built with workspace isolation, bank-grade encryption for credentials, and strict access control policies.'
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can upgrade, downgrade, or cancel your subscription at any time with one click from your billing settings.'
  }
]
</script>

<style scoped>
/* =========================================================
   DESIGN TOKENS & RESET
========================================================= */
:global(html),
:global(body) {
  overflow-x: hidden;
  max-width: 100vw;
  margin: 0;
  padding: 0;
}

.landing-page {
  color-scheme: dark !important;
  background: #060810 !important;
  background-color: #060810 !important;
  color: #F8FAFF !important;

  --bg-main: #060810;
  --bg-surface-1: #080B12;
  --bg-surface-2: #0B0E17;
  --bg-card: #11151F;
  --bg-card-elevated: #141925;
  --bg-card-highlight: #171C29;

  --color-primary: #7D4DFF;
  --color-primary-hover: #6D52FF;
  --color-primary-glow: rgba(125, 77, 255, 0.4);
  --color-accent-blue: #4D83FF;
  --color-accent-purple: #A653FF;
  --color-accent-pink: #E255D8;
  --color-accent-green: #22C55E;

  --text-high: #F8FAFF;
  --text-medium: #C6CBD8;
  --text-muted: #858D9F;
  --text-dim: #737B8F;

  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-medium: rgba(255, 255, 255, 0.12);
  --border-glow: rgba(133, 100, 255, 0.35);

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

/* =========================================================
   AMBIENT GLOWS
========================================================= */
.ambient-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
}

.glow-hero-left {
  top: 60px;
  left: -80px;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%);
}

.glow-hero-right {
  top: 100px;
  right: -60px;
  width: 620px;
  height: 620px;
  background: radial-gradient(circle, rgba(124, 77, 255, 0.18) 0%, rgba(76, 131, 255, 0.1) 45%, transparent 70%);
}

.glow-showcase {
  top: 20%;
  left: 10%;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(124, 77, 255, 0.14) 0%, transparent 65%);
}

/* =========================================================
   BUTTONS
========================================================= */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: none;
  outline: none;
}

.btn-primary-nav {
  background: var(--color-primary);
  color: #FFF;
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 13.5px;
  box-shadow: 0 0 16px rgba(124, 77, 255, 0.4);
}

.btn-primary-nav:hover {
  background: var(--color-primary-hover);
  box-shadow: 0 0 22px rgba(124, 77, 255, 0.6);
  transform: translateY(-1px);
}

.btn-outline-nav {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-high);
  border: 1px solid var(--border-subtle);
  padding: 7px 16px;
  border-radius: 9999px;
  font-size: 13.5px;
}

.btn-outline-nav:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: var(--border-medium);
}

.btn-hero-primary {
  background: var(--color-primary);
  color: #FFF;
  padding: 14px 28px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 600;
  gap: 8px;
  box-shadow: 0 8px 24px -2px rgba(124, 77, 255, 0.55);
}

.btn-hero-primary:hover {
  background: var(--color-primary-hover);
  box-shadow: 0 12px 28px 0 rgba(124, 77, 255, 0.7);
  transform: translateY(-2px);
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-high);
  border: 1px solid var(--border-medium);
  padding: 13px 24px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 500;
  gap: 10px;
  backdrop-filter: blur(12px);
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.play-icon-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* =========================================================
   1. SITE HEADER
========================================================= */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(6, 8, 16, 0.65);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.25s ease;
}

.site-header.scrolled {
  background: rgba(6, 8, 16, 0.92);
  border-bottom-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
}

.header-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-badge {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, #7C4DFF 0%, #9348FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  color: #FFF;
  box-shadow: 0 4px 14px rgba(124, 77, 255, 0.45);
}

.brand-text {
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.5px;
  color: var(--text-high);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  color: var(--text-medium);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--text-high);
}

.chevron {
  opacity: 0.7;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-high);
  cursor: pointer;
  padding: 4px;
  line-height: 0;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  background: #0B0E17;
  border-bottom: 1px solid var(--border-medium);
  gap: 14px;
}

.mobile-menu a {
  color: var(--text-high);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
}

.mobile-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

/* =========================================================
   2. HERO SECTION
========================================================= */
.hero-section {
  position: relative;
  padding: 95px 0 65px;
  overflow: hidden;
}

.hero-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Hero Left Column */
.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(124, 77, 255, 0.1);
  border: 1px solid rgba(124, 77, 255, 0.35);
  color: #D9DDEA;
  font-size: 12.5px;
  font-weight: 500;
  margin-bottom: 22px;
}

.eyebrow-icon {
  color: var(--color-accent-purple);
}

.hero-headline {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.035em;
  margin: 0 0 20px 0;
}


.word-create {
  color: #F8FAFF;
}

.word-edit {
  color: #4C83FF;
}

.word-publish {
  color: #9348FF;
}

.word-grow {
  color: #E253D8;
}

.word-all {
  color: #F8FAFF;
}

.word-highlight {
  background: linear-gradient(90deg, #4C83FF 0%, #6D52FF 70%, #9348FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 35px rgba(109, 82, 255, 0.35);
}

.hero-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 480px;
  margin: 0 0 32px 0;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 34px;
}

.hero-trust-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.avatar-stack {
  display: flex;
  align-items: center;
}

.avatar-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--bg-main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #FFF;
  margin-left: -8px;
}

.avatar-circle:first-child {
  margin-left: 0;
}

.av-1 { background: #6366F1; }
.av-2 { background: #EC4899; }
.av-3 { background: #3B82F6; }
.av-4 { background: #10B981; }

.trust-text {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

.trust-text strong {
  color: var(--text-high);
}

/* =========================================================
   DASHBOARD WINDOW MOCKUP (HERO RIGHT)
========================================================= */
.hero-right {
  position: relative;
  width: 100%;
}

.dashboard-window {
  width: 100%;
  background: #0C1019;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow:
    0 25px 60px -10px rgba(0, 0, 0, 0.85),
    0 0 60px rgba(124, 77, 255, 0.22);
  overflow: hidden;
  position: relative;
}

.dash-window-bar {
  height: 42px;
  background: #090C14;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dash-window-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-brand-badge {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: linear-gradient(135deg, #7C4DFF, #9348FF);
  color: #FFF;
  font-weight: 800;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-brand-name {
  font-size: 12px;
  font-weight: 700;
  color: #D9DDEA;
}

.dash-search-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 10.5px;
  color: var(--text-dim);
}

.dash-window-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
}

.dash-window-body {
  display: grid;
  grid-template-columns: 140px 1fr;
  min-height: 380px;
}

.dash-sidebar {
  background: #090C14;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dash-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 7px;
  font-size: 11px;
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.15s ease;
}

.dash-nav-item:hover {
  color: var(--text-high);
  background: rgba(255, 255, 255, 0.03);
}

.dash-nav-item.active {
  background: rgba(124, 77, 255, 0.18);
  color: #F8FAFF;
  font-weight: 600;
  border-left: 2.5px solid #7C4DFF;
}

.dash-main-area {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dash-greeting-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.dash-date-badge {
  font-size: 10px;
  color: var(--text-dim);
}

.dash-greeting-title {
  font-size: 17px;
  font-weight: 700;
  color: #F8FAFF;
  margin: 2px 0 0 0;
}

.dash-new-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFF;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.dash-new-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

/* Quick Cards */
.dash-quick-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.dash-qcard {
  background: #111522;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.qcard-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.q-purple { background: rgba(124, 77, 255, 0.25); color: #B05CFF; }
.q-blue { background: rgba(76, 131, 255, 0.25); color: #4C83FF; }
.q-orange { background: rgba(249, 115, 22, 0.25); color: #FB923C; }
.q-green { background: rgba(34, 197, 94, 0.25); color: #4ADE80; }

.qcard-text {
  display: flex;
  flex-direction: column;
}

.qcard-text strong {
  font-size: 11px;
  color: #F8FAFF;
  line-height: 1.2;
}

.qcard-text small {
  font-size: 9.5px;
  color: var(--text-dim);
}

/* Recent Projects Section */
.dash-projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.dash-projects-header strong {
  font-size: 12.5px;
  color: #F8FAFF;
}

.view-all-link {
  font-size: 11px;
  color: var(--text-dim);
  cursor: pointer;
}

.view-all-link:hover {
  color: var(--text-high);
}

.dash-projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.dash-project-card {
  background: #111522;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  overflow: hidden;
}

.project-preview {
  height: 86px;
  position: relative;
  overflow: hidden;
}

.proj-badge {
  position: absolute;
  top: 7px;
  right: 7px;
  font-size: 8.5px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  z-index: 5;
}

.badge-new { background: rgba(124, 77, 255, 0.85); color: #FFF; }
.badge-reel { background: rgba(226, 83, 216, 0.85); color: #FFF; }
.badge-short { background: rgba(76, 131, 255, 0.85); color: #FFF; }

.project-info {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
}

.project-info strong {
  font-size: 11.5px;
  color: #F8FAFF;
}

.project-info small {
  font-size: 9.5px;
  color: var(--text-dim);
}

/* CSS Art Mini Landscapes for Mockups */
.scene-landscape {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #1e1b4b 0%, #312e81 35%, #4338ca 70%, #f97316 100%);
  position: relative;
}

.scene-sun {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fde047;
  box-shadow: 0 0 15px #f97316;
}

.scene-mountain {
  position: absolute;
  bottom: 16px;
  width: 0;
  height: 0;
  border-style: solid;
}

.m-back {
  left: 10%;
  border-width: 0 45px 50px 45px;
  border-color: transparent transparent #1e1b4b transparent;
}

.m-front {
  left: 40%;
  border-width: 0 55px 60px 55px;
  border-color: transparent transparent #0f172a transparent;
}

.scene-lake {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 16px;
  background: linear-gradient(180deg, #f97316 0%, #0369a1 100%);
  opacity: 0.8;
}

.scene-ocean {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #0c4a6e 0%, #0284c7 60%, #38bdf8 100%);
  position: relative;
}

.ocean-sun {
  position: absolute;
  top: 15px;
  right: 20px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fef08a;
  box-shadow: 0 0 12px #fef08a;
}

.ocean-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
}

.w-1 { height: 26px; border-radius: 50% 50% 0 0; }
.w-2 { height: 14px; background: #0369a1; }

.scene-city {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #4c0519 0%, #831843 50%, #9d174d 100%);
  position: relative;
}

.city-building {
  position: absolute;
  bottom: 0;
  background: #0f172a;
}

.b-1 { left: 15%; width: 22px; height: 50px; }
.b-2 { left: 40%; width: 28px; height: 65px; }
.b-3 { left: 70%; width: 20px; height: 40px; }

/* =========================================================
   FLOATING ANALYTICS CARD
========================================================= */
.floating-analytics-card {
  position: absolute;
  right: -20px;
  bottom: -22px;
  width: 220px;
  background: rgba(18, 23, 37, 0.94);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow:
    0 16px 36px rgba(0, 0, 0, 0.65),
    0 0 30px rgba(76, 131, 255, 0.2);
  z-index: 10;
}

.analytics-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}

.analytics-stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0 10px 0;
}

.analytics-number {
  font-size: 25px;
  font-weight: 800;
  color: #F8FAFF;
  line-height: 1;
}

.analytics-up-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 700;
  color: #22C55E;
  background: rgba(34, 197, 94, 0.15);
  padding: 3px 8px;
  border-radius: 9999px;
}

.sparkline-wrapper {
  width: 100%;
  height: 44px;
}

.sparkline-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* =========================================================
   3. PLATFORM TRUST BAR
========================================================= */
.platform-bar-section {
  max-width: 1240px;
  margin: 55px auto 0;
  padding: 0 24px;
  text-align: center;
}

.platform-title {
  margin: 0 0 18px 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dim);
}

.platform-icons-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.platform-pill {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.platform-pill:hover {
  transform: translateY(-2px);
}

.plat-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.plat-youtube { background: #FF0000; }
.plat-instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.plat-tiktok { background: #000000; border: 1px solid rgba(255, 255, 255, 0.15); }
.plat-linkedin { background: #0A66C2; }
.plat-facebook { background: #1877F2; }
.plat-x { background: #000000; border: 1px solid rgba(255, 255, 255, 0.15); }
.plat-threads { background: #101010; border: 1px solid rgba(255, 255, 255, 0.15); }
.plat-pinterest { background: #E60023; }
.plat-reddit { background: #FF4500; }

.platforms-more {
  font-size: 13px;
  color: var(--text-dim);
  margin-left: 6px;
}

/* =========================================================
   COMMON SECTION HEADINGS
========================================================= */
.section {
  padding: 100px 0;
  position: relative;
}

#features,
#product,
#pricing {
  padding: 100px 0;
}

#testimonials {
  padding: 90px 0;
}

#faq {
  padding: 80px 0;
}

.section-heading-centered {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 56px auto;
}

.section-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-accent-purple);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: #F8FAFF;
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin: 0 0 14px 0;
}

.section-subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0 auto;
}

/* =========================================================
   4. FEATURES SECTION (4 COLS × 2 ROWS)
========================================================= */
.feature-grid-4x2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.feature-card {
  background: #11151F;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 24px 22px;
  min-height: 155px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover {
  transform: translateY(-3px);
  border-color: rgba(120, 90, 255, 0.35);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(120, 90, 255, 0.16);
}

.feature-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.c-purple { background: rgba(124, 77, 255, 0.22); color: #B05CFF; }
.c-blue { background: rgba(59, 130, 246, 0.22); color: #60A5FA; }
.c-green { background: rgba(16, 185, 129, 0.22); color: #34D399; }
.c-orange { background: rgba(249, 115, 22, 0.22); color: #FB923C; }
.c-pink { background: rgba(236, 72, 153, 0.22); color: #F472B6; }
.c-yellow { background: rgba(245, 158, 11, 0.22); color: #FBBF24; }
.c-violet { background: rgba(139, 92, 246, 0.22); color: #A78BFA; }
.c-cyan { background: rgba(6, 182, 212, 0.22); color: #22D3EE; }

.feature-title {
  font-size: 16px;
  font-weight: 700;
  color: #F8FAFF;
  margin: 0 0 8px 0;
}

.feature-desc {
  font-size: 12.5px;
  line-height: 1.55;
  color: #AEB5C5;
  margin: 0;
}

/* =========================================================
   5. PRODUCT SHOWCASE (EDITING STUDIO)
========================================================= */
.showcase-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 56px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.showcase-mockup-wrapper {
  width: 100%;
}

.editor-window {
  background: #0C1019;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 25px 60px -10px rgba(0, 0, 0, 0.8),
    0 0 50px rgba(124, 77, 255, 0.18);
}

.editor-titlebar {
  height: 42px;
  background: #090C14;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editor-titlebar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-app-icon {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: rgba(124, 77, 255, 0.25);
  color: #B05CFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-app-name {
  font-size: 13px;
  color: #F8FAFF;
  font-weight: 700;
}

.editor-save-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #22C55E;
  font-weight: 600;
}

.editor-layout {
  display: grid;
  grid-template-columns: 56px 1fr;
  min-height: 350px;
}

.editor-asset-strip {
  background: #090C14;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.asset-thumb {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: all 0.15s ease;
}

.asset-thumb.active {
  border-color: #7C4DFF;
  box-shadow: 0 0 10px rgba(124, 77, 255, 0.5);
}

.thumb-sunset {
  background: linear-gradient(135deg, #f97316 0%, #ec4899 50%, #4338ca 100%);
}

.thumb-ocean {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0c4a6e 100%);
}

.thumb-city {
  background: linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #1e1b4b 100%);
}

.thumb-nature {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #064e3b 100%);
}

.editor-center-canvas {
  display: flex;
  flex-direction: column;
  background: #0C1019;
}

.editor-video-preview {
  height: 230px;
  position: relative;
  overflow: hidden;
  background: #000;
}

/* Realistic Mountain Sunset Landscape Frame */
.video-scenic-frame {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(180deg, #1e1b4b 0%, #4338ca 35%, #ec4899 70%, #f97316 100%);
}

.scenic-sun {
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #fef08a;
  box-shadow: 0 0 35px #f97316;
}

.scenic-mountain-back {
  position: absolute;
  bottom: 45px;
  left: 15%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 110px 130px 110px;
  border-color: transparent transparent #2e1065 transparent;
}

.scenic-mountain-front {
  position: absolute;
  bottom: 40px;
  left: 38%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 130px 150px 130px;
  border-color: transparent transparent #0f172a transparent;
}

.scenic-lake {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  background: linear-gradient(180deg, #f97316 0%, #0369a1 50%, #082f49 100%);
  opacity: 0.9;
}

.scenic-lake-reflection {
  width: 60px;
  height: 100%;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(254, 240, 138, 0.7) 0%, transparent 80%);
  filter: blur(4px);
}

/* Floating AI Tools Menu inside Editor */
.editor-ai-float {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 165px;
  background: rgba(18, 23, 37, 0.92);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 10px 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.ai-panel-header {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 700;
  color: var(--color-accent-purple);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

.ai-tools-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ai-tool-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: #D9DDEA;
  font-size: 11px;
  padding: 5px 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.ai-tool-item:hover {
  background: rgba(124, 77, 255, 0.2);
  color: #FFF;
  border-color: rgba(124, 77, 255, 0.4);
}

.ai-star {
  color: var(--color-accent-purple);
  font-size: 11px;
}

/* Timeline */
.editor-timeline {
  background: #090C14;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 10px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.timeline-ruler {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: var(--text-dim);
  padding: 0 4px;
}

.timeline-track {
  height: 22px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.track-block {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  font-size: 9.5px;
  font-weight: 600;
  color: #FFF;
}

.block-video { background: linear-gradient(90deg, #0284c7, #38bdf8); }
.block-audio { background: linear-gradient(90deg, #7c3aed, #a855f7); }
.block-subtitles { background: linear-gradient(90deg, #db2777, #f472b6); }

/* Right Column (Showcase Copy) */
.showcase-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.eyebrow-showcase {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.showcase-headline {
  font-size: 40px;
  font-weight: 800;
  color: #F8FAFF;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 10px 0 16px 0;
}

.showcase-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0 0 28px 0;
}

.showcase-checklist {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.showcase-checklist li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #F8FAFF;
}

.check-circle-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(124, 77, 255, 0.4);
}

.btn-showcase-cta {
  background: var(--color-primary);
  color: #FFF;
  padding: 13px 26px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 600;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(124, 77, 255, 0.45);
}

.btn-showcase-cta:hover {
  background: var(--color-primary-hover);
  box-shadow: 0 12px 28px rgba(124, 77, 255, 0.65);
  transform: translateY(-2px);
}

/* =========================================================
   6. TESTIMONIALS SECTION
========================================================= */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 30px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.25s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-medium);
}

.testimonial-card.card-highlighted {
  border-color: rgba(124, 77, 255, 0.4);
  box-shadow:
    0 0 30px rgba(124, 77, 255, 0.16),
    0 12px 30px rgba(0, 0, 0, 0.4);
  background: #141926;
}

.testimonial-quote-mark {
  font-size: 38px;
  line-height: 1;
  color: rgba(124, 77, 255, 0.4);
  font-family: Georgia, serif;
  margin-bottom: 6px;
}

.testimonial-quote {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-medium);
  margin: 0 0 24px 0;
  flex-grow: 1;
}

.testimonial-author-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.author-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #FFF;
  flex-shrink: 0;
}

.av-purple { background: linear-gradient(135deg, #7C4DFF, #9348FF); }
.av-blue { background: linear-gradient(135deg, #3B82F6, #60A5FA); }
.av-violet { background: linear-gradient(135deg, #8B5CF6, #A78BFA); }

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 14.5px;
  color: #F8FAFF;
}

.author-role {
  font-size: 12px;
  color: var(--text-dim);
}

.star-rating-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* =========================================================
   7. PRICING SECTION
========================================================= */
.billing-toggle-wrapper {
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

.billing-pill-container {
  display: inline-flex;
  background: #111522;
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  padding: 4px;
  gap: 4px;
}

.toggle-opt-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.toggle-opt-btn.active {
  background: var(--color-primary);
  color: #FFF;
  box-shadow: 0 2px 10px rgba(124, 77, 255, 0.4);
}

.save-badge {
  font-size: 10.5px;
  font-weight: 700;
  background: rgba(245, 158, 11, 0.2);
  color: #FBBF24;
  padding: 2px 7px;
  border-radius: 9999px;
}

.pricing-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
}

.pricing-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.25s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-medium);
}

.pricing-card.featured-plan-card {
  background: #141928;
  border: 1.5px solid #7C4DFF;
  box-shadow:
    0 0 35px rgba(124, 77, 255, 0.28),
    0 20px 40px rgba(0, 0, 0, 0.6);
}

.most-popular-pill {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #E253D8;
  color: #FFF;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(226, 83, 216, 0.4);
}

.plan-name {
  font-size: 19px;
  font-weight: 700;
  color: #F8FAFF;
  margin: 0 0 12px 0;
}

.plan-price-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
}

.price-currency {
  font-size: 20px;
  font-weight: 700;
  color: #F8FAFF;
  margin-right: 2px;
}

.price-amount {
  font-size: 40px;
  font-weight: 800;
  color: #F8FAFF;
  line-height: 1;
}

.price-period {
  font-size: 13px;
  color: var(--text-dim);
  margin-left: 6px;
}

.plan-summary {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0 0 24px 0;
  min-height: 38px;
}

.plan-features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.plan-features-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-medium);
}

.plan-check-icon {
  color: #22C55E;
  flex-shrink: 0;
}

.plan-cta-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}

.btn-plan-regular {
  background: rgba(255, 255, 255, 0.05);
  color: #F8FAFF;
  border: 1px solid var(--border-medium);
}

.btn-plan-regular:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

.btn-plan-featured {
  background: var(--color-primary);
  color: #FFF;
  box-shadow: 0 6px 20px rgba(124, 77, 255, 0.45);
}

.btn-plan-featured:hover {
  background: var(--color-primary-hover);
  box-shadow: 0 8px 24px rgba(124, 77, 255, 0.65);
}

/* =========================================================
   8. CTA BANNER SECTION
========================================================= */
.cta-banner-section {
  padding: 40px 0 80px;
}

.cta-banner-box {
  background: linear-gradient(135deg, #6038D0 0%, #3B74F2 100%);
  border-radius: 20px;
  padding: 48px 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  box-shadow: 0 20px 50px rgba(96, 56, 208, 0.35);
}

.cta-banner-content {
  display: flex;
  flex-direction: column;
}

.cta-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 6px;
}

.cta-headline {
  font-size: 36px;
  font-weight: 800;
  color: #FFF;
  line-height: 1.2;
  margin: 0 0 10px 0;
}

.cta-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.btn-cta-primary {
  background: #7C4DFF;
  color: #FFF;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 15px 32px;
  border-radius: 9999px;
  font-size: 15.5px;
  font-weight: 700;
  white-space: nowrap;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.btn-cta-primary:hover {
  background: #6D52FF;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

/* =========================================================
   9. FAQ SECTION (2 COLUMNS)
========================================================= */
.faq-accordion-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.faq-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.faq-item:hover {
  border-color: var(--border-medium);
}

.faq-item.faq-open {
  border-color: rgba(124, 77, 255, 0.35);
  background: #141926;
}

.faq-header-btn {
  width: 100%;
  background: none;
  border: none;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
}

.faq-question {
  font-size: 15px;
  font-weight: 600;
  color: #F8FAFF;
}

.faq-chevron {
  color: var(--text-dim);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.faq-chevron.rotated {
  transform: rotate(180deg);
  color: var(--color-primary);
}

.faq-body {
  padding: 0 20px 18px;
}

.faq-body p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
}

/* =========================================================
   10. SITE FOOTER
========================================================= */
.site-footer {
  background: #060810;
  border-top: 1px solid var(--border-subtle);
  padding: 80px 0 40px;
}

.footer-main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.6fr;
  gap: 40px;
  margin-bottom: 56px;
}

.footer-col-brand {
  display: flex;
  flex-direction: column;
}

.footer-tagline {
  font-size: 13.5px;
  color: var(--text-dim);
  line-height: 1.5;
  margin: 14px 0 22px 0;
  max-width: 260px;
}

.footer-social-row {
  display: flex;
  gap: 10px;
}

.social-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.15s ease;
}

.social-btn:hover {
  background: rgba(124, 77, 255, 0.15);
  color: #F8FAFF;
  border-color: rgba(124, 77, 255, 0.35);
}

.footer-col-nav {
  display: flex;
  flex-direction: column;
}

.footer-heading {
  font-size: 13.5px;
  font-weight: 700;
  color: #F8FAFF;
  margin: 0 0 18px 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 13.5px;
  transition: color 0.15s ease;
}

.footer-links a:hover {
  color: #F8FAFF;
}

.footer-col-newsletter {
  display: flex;
  flex-direction: column;
}

.newsletter-sub {
  font-size: 13px;
  color: var(--text-dim);
  margin: 0 0 14px 0;
}

.newsletter-form {
  display: flex;
  width: 100%;
}

.newsletter-input {
  flex-grow: 1;
  background: #111522;
  border: 1px solid var(--border-medium);
  border-right: none;
  border-radius: 8px 0 0 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #FFF;
  outline: none;
}

.newsletter-input:focus {
  border-color: var(--color-primary);
}

.newsletter-submit-btn {
  background: var(--color-primary);
  color: #FFF;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
}

.newsletter-submit-btn:hover {
  background: var(--color-primary-hover);
}

.newsletter-ok {
  font-size: 12px;
  color: #22C55E;
  margin-top: 8px;
}

.footer-bottom-bar {
  border-top: 1px solid var(--border-subtle);
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-dim);
}

.built-with {
  display: flex;
  align-items: center;
  gap: 5px;
}

.heart-icon {
  margin-left: 2px;
}

/* =========================================================
   RESPONSIVE BREAKPOINTS
========================================================= */
@media (max-width: 1040px) {
  .hero-container {
    grid-template-columns: 1fr 1.15fr;
    gap: 32px;
  }

  .hero-headline {
    font-size: 52px;
  }
}

@media (max-width: 960px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero-left {
    align-items: center;
    text-align: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .feature-grid-4x2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .pricing-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .showcase-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .footer-main-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .nav-actions .btn-outline-nav,
  .nav-actions .btn-primary-nav {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .header-container {
    padding: 0 16px;
  }

  .section {
    padding: 70px 0;
  }

  .section-title {
    font-size: clamp(28px, 6vw, 36px);
  }

  .hero-headline {
    font-size: clamp(34px, 7vw, 46px);
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .faq-accordion-grid {
    grid-template-columns: 1fr;
  }

  .cta-banner-box {
    flex-direction: column;
    text-align: center;
    padding: 36px 24px;
  }

  .footer-main-grid {
    grid-template-columns: 1fr;
  }

  .floating-analytics-card {
    right: 10px;
    bottom: -15px;
  }
}

@media (max-width: 540px) {
  .desktop-break {
    display: none;
  }

  .hero-section {
    padding: 32px 0 46px;
  }

  .hero-container {
    padding: 0 16px;
  }

  .container {
    padding: 0 16px;
  }

  .hero-headline {
    font-size: clamp(23px, 6.8vw, 30px);
    line-height: 1.14;
    word-break: normal;
  }

  .section-title {
    font-size: clamp(23px, 6vw, 30px);
  }

  .hero-cta-group {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .btn-hero-primary,
  .btn-hero-secondary {
    width: 100%;
    justify-content: center;
  }

  .hero-trust-row {
    flex-direction: column;
    text-align: center;
    gap: 8px;
    align-items: center;
  }

  .feature-grid-4x2 {
    grid-template-columns: 1fr;
  }

  .pricing-grid-4 {
    grid-template-columns: 1fr;
  }

  .dash-window-body {
    grid-template-columns: 1fr;
  }

  .dash-window-center {
    display: none;
  }

  .dash-window-bar {
    padding: 0 12px;
  }

  .cta-banner-box {
    padding: 28px 18px;
  }

  .dash-sidebar {
    display: none;
  }

  .dash-quick-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .dash-projects-grid {
    grid-template-columns: 1fr;
  }

  .floating-analytics-card {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    margin-top: 14px;
  }

  .footer-bottom-bar {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>