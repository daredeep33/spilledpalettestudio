import { MetadataRoute } from 'next'
import { artworks } from '@/data/artworks'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://spilledpalettestudio.com'

    // Static routes
    const routes = [
        '',
        '/gallery',
        '/about',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes for artworks
    const artworkRoutes = artworks.map((artwork) => ({
        url: `${baseUrl}/gallery/${artwork.id}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...routes, ...artworkRoutes]
}
