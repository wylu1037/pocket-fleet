import { createFileRoute, Link } from '@tanstack/react-router'
import { getBlogPosts, getFileUrl, type BlogPost } from '~/lib/pocketbase'

export const Route = createFileRoute('/blog/')({
  loader: async () => {
    const posts = await getBlogPosts(1, 20)
    return { posts: posts.items }
  },
  component: BlogIndexPage,
})

function BlogIndexPage() {
  const { posts } = Route.useLoaderData()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold gradient-text">
                Pocket Fleet
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/" className="link-underline text-sm">
                Home
              </Link>
              <Link to="/blog" className="link-underline text-sm text-white">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-wide">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Blog
            </h1>
            <p className="text-xl text-zinc-400">
              Thoughts, stories, and insights from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24">
        <div className="container-wide">
          {posts.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-zinc-400">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: BlogPost, i: number) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className={`glass-card overflow-hidden group hover:border-zinc-700 transition-all duration-300 animate-slide-up animation-delay-${Math.min((i + 1) * 100, 500)}`}
                >
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getFileUrl(post, post.cover_image)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.category && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-500/10 text-primary-400 capitalize">
                          {post.category}
                        </span>
                      )}
                      {post.published_at && (
                        <span className="text-xs text-zinc-500">
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-zinc-400 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Pocket Fleet. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/" className="text-zinc-500 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/blog" className="text-zinc-500 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

