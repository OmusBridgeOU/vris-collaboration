module.exports = {
  ci: {
    collect: {
      // Collection configuration
      numberOfRuns: 3,
      startServerCommand: 'bun run dev:local',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:3000',
      ],
      settings: {
        // Lighthouse settings
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        emulatedFormFactor: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: process.env.LHCI_SERVER_URL || 'https://lhci-backend.omusb.app',
      token: process.env.LHCI_TOKEN,
      basicAuth: {
        username: process.env.LHCI_BASIC_AUTH_USERNAME || 'admin',
        password: process.env.LHCI_BASIC_AUTH_PASSWORD,
      },
      ignoreDuplicateBuildFailure: false,
    },
    assert: {
      // Assertion configuration
      assertions: {
        // Performance thresholds (visual content heavy)
        'categories:performance': ['error', { minScore: 0.6 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals (relaxed)
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3500 }],
        'first-meaningful-paint': ['warn', { maxNumericValue: 3000 }],
        'speed-index': ['warn', { maxNumericValue: 4000 }],
        'interactive': ['error', { maxNumericValue: 4500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.15 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],

        // Resource optimization (lenient for content)
        'unused-css-rules': ['warn', { maxLength: 2 }],
        'unused-javascript': ['warn', { maxLength: 2 }],
        'render-blocking-resources': ['warn', { maxLength: 2 }],
        'unminified-css': ['warn', { maxLength: 0 }],
        'unminified-javascript': ['warn', { maxLength: 0 }],
        'efficient-animated-content': ['warn', { maxLength: 1 }],
        'uses-optimized-images': ['warn', { maxLength: 2 }],
        'uses-webp-images': ['warn', { maxLength: 2 }],
        'uses-responsive-images': ['warn', { maxLength: 2 }],

        // Accessibility
        'color-contrast': ['error', { maxLength: 0 }],
        'image-alt': ['error', { maxLength: 0 }],
        'label': ['error', { maxLength: 0 }],
        'link-name': ['error', { maxLength: 0 }],

        // SEO
        'meta-description': ['error', { maxLength: 0 }],
        'document-title': ['error', { maxLength: 0 }],
        'hreflang': ['warn', { maxLength: 1 }],
        'canonical': ['warn', { maxLength: 1 }],
      },
    },
    wizard: {
      // Wizard configuration for setup
      serverBaseUrl: process.env.LHCI_SERVER_URL || 'https://lhci-backend.omusb.app',
    },
  },
}
