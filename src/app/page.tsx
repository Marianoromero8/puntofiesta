import { getProducts, getPublicSettings } from '@/lib/api';
import CarouselSection from '@/components/CarouselSection';
import BestSellersSection from '@/components/BestSellersSection';
import LocationSection from '@/components/LocationSection';
import InfoHighlights from '@/components/InfoHighlights';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [products, settings] = await Promise.all([getProducts(), getPublicSettings()]);

  const bestSellers = products.filter((p) => p.active && p.featured);

  return (
    <div>
      {/* Carousel */}
      <CarouselSection />

      {/* Best sellers */}
      {bestSellers.length > 0 && <BestSellersSection products={bestSellers} />}

      {/* Location */}
      <LocationSection address={settings.address} />

      {/* Static info cards */}
      <InfoHighlights />
    </div>
  );
}
