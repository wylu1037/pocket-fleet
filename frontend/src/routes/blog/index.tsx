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
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="gradient-text font-display text-xl font-bold">Pocket Fleet</span>
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
      <section className="pb-16 pt-32">
        <div className="container-wide">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">Blog</h1>
            <p className="text-xl text-zinc-400">Thoughts, stories, and insights from our team.</p>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: BlogPost, i: number) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className={`glass-card group animate-slide-up overflow-hidden transition-all duration-300 hover:border-zinc-700 animation-delay-${Math.min((i + 1) * 100, 500)}`}
                >
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getFileUrl(post, post.cover_image)}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      {post.category && (
                        <span className="rounded-full bg-primary-500/10 px-2 py-1 text-xs font-medium capitalize text-primary-400">
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
                    <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary-400">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="line-clamp-2 text-sm text-zinc-400">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container-wide">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Pocket Fleet. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/" className="text-zinc-500 transition-colors hover:text-white">
                Home
              </Link>
              <Link to="/blog" className="text-zinc-500 transition-colors hover:text-white">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
