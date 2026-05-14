import { MetadataRoute } from 'next'
import api from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.renishpharmaceutical.com';
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  try {
    // Dynamic Product routes
    const productsRes = await api.get('/product', { params: { status: 'active', limit: 100 } });
    const productRoutes = productsRes.data.data.map((product: any) => ({
      url: `${baseUrl}/products/${product._id}`,
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    // Dynamic Blog routes
    const blogsRes = await api.get('/blogs', { params: { status: 'published', limit: 50 } });
    const blogRoutes = blogsRes.data.data.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    return staticRoutes;
  }
}
