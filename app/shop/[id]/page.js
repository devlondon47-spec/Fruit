import { fruits } from '../../data/fruits';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return fruits.map((f) => ({
    id: f.id,
  }));
}

export default function ProductDetailPage({ params }) {
  return <ProductDetailClient params={params} />;
}
