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
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="gradient-text font-display text-xl font-bold">
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
      <section className="relative overflow-hidden pb-24 pt-32">
        <div className="container-wide relative z-10">
          <div className="mx-auto max-w-3xl animate-fade-in text-center">
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-white">Build Something</span>
              <span className="gradient-text block">Extraordinary</span>
            </h1>
            <p className="animation-delay-100 mx-auto mb-10 max-w-2xl animate-slide-up text-lg text-zinc-400 sm:text-xl">
              {config.site_description ||
                'A modern, fast, and flexible platform for your digital presence. Powered by cutting-edge technology.'}
            </p>
            <div className="animation-delay-200 flex animate-slide-up flex-wrap justify-center gap-4">
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
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24">
        <div className="container-wide">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">Why Choose Us</h2>
            <p className="mx-auto max-w-2xl text-zinc-400">
              Built with the latest technologies for performance, security, and developer
              experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Lightning Fast',
                description:
                  'Optimized for speed with server-side rendering and smart caching strategies.',
                icon: '⚡',
              },
              {
                title: 'Fully Customizable',
                description:
                  'Every aspect can be configured through the admin panel without code changes.',
                icon: '🎨',
              },
              {
                title: 'SEO Optimized',
                description:
                  'Built-in SEO best practices to help your content rank higher in search results.',
                icon: '🔍',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`glass-card animate-slide-up p-8 transition-all duration-300 hover:border-zinc-700 animation-delay-${(i + 1) * 100}`}
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24">
        <div className="container-narrow">
          <div className="glass-card relative overflow-hidden p-12 text-center">
            <div className="relative z-10">
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-zinc-400">
                Contact us today and let's build something amazing together.
              </p>
              <a
                href={`mailto:${config.contact_email || 'hello@example.com'}`}
                className="btn-primary"
              >
                Get in Touch
              </a>
            </div>
            <div className="absolute right-0 top-0 h-64 w-64 bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container-wide">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} {config.site_name || 'Pocket Fleet'}. All rights
              reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-500 transition-colors hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-zinc-500 transition-colors hover:text-white">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
