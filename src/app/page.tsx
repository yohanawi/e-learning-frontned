import CTA from '@/components/CTA';
import CategorySection from '@/components/Home_Page/CategorySection';
import EventSection from '@/components/Home_Page/EventSection';
import FeaturesSection from '@/components/Home_Page/FeaturesSection';
import HeroSection from '@/components/Home_Page/HeroSection';
import LatestNewsSection from '@/components/Home_Page/LatestNewsSection';
import TestimonialSection from '@/components/TestimonialSection';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [coursesResponse, popularBlogs] = await Promise.all([
    api.courses.getMainCourses(),
    api.blogs.getPopularLatest(10),
  ]);

  const mainCourses = coursesResponse.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50">

      <HeroSection />
      <FeaturesSection />
      <CategorySection mainCourses={mainCourses} />
      <CTA />
      <TestimonialSection />
      <LatestNewsSection blogs={popularBlogs} />
    </div>
  );
}
