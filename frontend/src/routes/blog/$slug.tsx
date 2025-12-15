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
              <Link to="/blog" className="link-underline text-sm">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="pb-24 pt-32">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <div className="mb-8 animate-fade-in">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
            >
              <span>←</span>
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Meta */}
          <div className="mb-6 flex animate-slide-up items-center gap-3">
            {post.category && (
              <span className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium capitalize text-primary-400">
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
          <h1 className="animation-delay-100 mb-8 animate-slide-up font-display text-4xl font-bold sm:text-5xl">
            {post.title}
          </h1>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="animation-delay-200 mb-12 animate-slide-up overflow-hidden rounded-2xl">
              <img
                src={getFileUrl(post, post.cover_image)}
                alt={post.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="animation-delay-200 mb-8 flex animate-slide-up flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg animation-delay-300 prose-headings:font-display prose-headings:font-semibold prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 max-w-none animate-slide-up"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

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
