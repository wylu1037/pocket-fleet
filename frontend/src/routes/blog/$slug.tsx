import { createFileRoute, Link } from '@tanstack/react-router'
import { getBlogPostBySlug, getFileUrl } from '~/lib/pocketbase'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(params.slug)
    return { post }
  },
  component: BlogPostPage,
})

function BlogPostPage() {
  const { post } = Route.useLoaderData()

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
              <Link to="/blog" className="link-underline text-sm">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="pt-32 pb-24">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <div className="mb-8 animate-fade-in">
            <Link
              to="/blog"
              className="text-sm text-zinc-500 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6 animate-slide-up">
            {post.category && (
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 capitalize">
                {post.category}
              </span>
            )}
            {post.published_at && (
              <span className="text-sm text-zinc-500">
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            <span className="text-sm text-zinc-600">•</span>
            <span className="text-sm text-zinc-500">{post.view_count || 0} views</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-8 animate-slide-up animation-delay-100">
            {post.title}
          </h1>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="rounded-2xl overflow-hidden mb-12 animate-slide-up animation-delay-200">
              <img
                src={getFileUrl(post, post.cover_image)}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 animate-slide-up animation-delay-200">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none animate-slide-up animation-delay-300
                       prose-headings:font-display prose-headings:font-semibold
                       prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                       prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                       prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

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

