import { createFileRoute, Link } from '@tanstack/react-router'
import { getSiteConfig } from '~/lib/pocketbase'

export const Route = createFileRoute('/')({
  loader: async () => {
    const config = await getSiteConfig()
    return { config }
  },
  component: HomePage,
})

function HomePage() {
  const { config } = Route.useLoaderData()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold gradient-text">
                {config.site_name || 'Pocket Fleet'}
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/" className="link-underline text-sm">
                Home
              </Link>
              <Link to="/blog" className="link-underline text-sm">
                Blog
              </Link>
              <a href="#contact" className="link-underline text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6">
              <span className="block text-white">Build Something</span>
              <span className="block gradient-text">Extraordinary</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-100">
              {config.site_description || 'A modern, fast, and flexible platform for your digital presence. Powered by cutting-edge technology.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up animation-delay-200">
              <Link to="/blog" className="btn-primary">
                Explore Blog
              </Link>
              <a href="#features" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Built with the latest technologies for performance, security, and developer experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Lightning Fast',
                description: 'Optimized for speed with server-side rendering and smart caching strategies.',
                icon: '⚡',
              },
              {
                title: 'Fully Customizable',
                description: 'Every aspect can be configured through the admin panel without code changes.',
                icon: '🎨',
              },
              {
                title: 'SEO Optimized',
                description: 'Built-in SEO best practices to help your content rank higher in search results.',
                icon: '🔍',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`glass-card p-8 hover:border-zinc-700 transition-all duration-300 animate-slide-up animation-delay-${(i + 1) * 100}`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24">
        <div className="container-narrow">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                Contact us today and let's build something amazing together.
              </p>
              <a
                href={`mailto:${config.contact_email || 'hello@example.com'}`}
                className="btn-primary"
              >
                Get in Touch
              </a>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} {config.site_name || 'Pocket Fleet'}. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

