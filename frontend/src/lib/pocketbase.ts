import PocketBase from 'pocketbase'

const pb = new PocketBase(
  typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:8090'
)

export { pb }

// Types for collections
export interface SiteConfig {
  id: string
  key: string
  value: string
  type: 'text' | 'image' | 'url' | 'json' | 'html'
  description?: string
  created: string
  updated: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image?: string
  published: boolean
  published_at?: string
  category?: 'tech' | 'design' | 'news' | 'tutorial' | 'other'
  tags?: string[]
  view_count: number
  created: string
  updated: string
}

export interface Media {
  id: string
  name: string
  alt?: string
  file: string
  category?: 'logo' | 'hero' | 'banner' | 'icon' | 'gallery' | 'other'
  created: string
  updated: string
}

// Helper to get file URL
export function getFileUrl(record: { id: string; collectionId?: string; collectionName?: string }, filename: string) {
  return pb.files.getURL(record, filename)
}

// API functions
export async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const records = await pb.collection('site_config').getFullList<SiteConfig>()
    return records.reduce((acc, record) => {
      acc[record.key] = record.value
      return acc
    }, {} as Record<string, string>)
  } catch {
    return {}
  }
}

export async function getBlogPosts(page = 1, perPage = 10) {
  return pb.collection('blog_posts').getList<BlogPost>(page, perPage, {
    filter: 'published = true',
    sort: '-published_at',
  })
}

export async function getBlogPostBySlug(slug: string) {
  return pb.collection('blog_posts').getFirstListItem<BlogPost>(`slug = "${slug}"`)
}

export async function getMedia(category?: string) {
  const filter = category ? `category = "${category}"` : ''
  return pb.collection('media').getFullList<Media>({
    filter,
    sort: '-created',
  })
}

