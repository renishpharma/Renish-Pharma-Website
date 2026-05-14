import { Metadata } from 'next';
import api from '@/lib/api';
import BlogDetailClient from './BlogDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await api.get(`/blogs/${slug}`);
    const blog = res.data.data;
    
    return {
      title: `${blog.title} | Renish Pharma Blogs`,
      description: blog.excerpt || blog.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...',
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
        images: blog.coverImage?.url ? [{ url: blog.coverImage.url }] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Blog | Renish Pharmaceutical',
      description: 'Insights and updates from the world of pharmaceutical innovation.',
    };
  }
}

export default async function BlogPage({ params }: Props) {
  return <BlogDetailClient params={params} />;
}
