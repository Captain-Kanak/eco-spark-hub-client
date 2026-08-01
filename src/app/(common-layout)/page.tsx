import Categories from "@/components/modules/home/Categories";
import Hero from "@/components/modules/home/Hero";
import Stats from "@/components/modules/home/Stats";
import HowItWorks from "@/components/modules/home/HowItWorks";
import FinalCTA from "@/components/modules/home/FinalCTA";
import { categoryAction } from "@/actions/category";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data: categories } = await categoryAction.getAll({});

  return (
    <>
      <Hero />

      <Stats />

      <Categories categories={categories || []} />

      <HowItWorks />

      <FinalCTA />
    </>
  );
}
