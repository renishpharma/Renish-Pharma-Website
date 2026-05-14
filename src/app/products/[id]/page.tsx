import { Metadata } from 'next';
import api from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await api.get(`/product/${id}`);
    const product = res.data.data;
    
    return {
      title: `${product.name} | Renish Pharmaceutical`,
      description: product.shortDescription || product.description || `View details for ${product.name}, a high-quality pharmaceutical product from Renish Pharma.`,
      openGraph: {
        title: `${product.name} | Renish Pharmaceutical`,
        description: product.shortDescription || product.description,
        images: product.media?.[0]?.url ? [{ url: product.media[0].url }] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product Details | Renish Pharmaceutical',
      description: 'Explore our high-quality pharmaceutical products.',
    };
  }
}

export default async function ProductPage({ params }: Props) {
  return <ProductDetailClient />;
}
