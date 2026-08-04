import Banner from "@/components/modules/home/Banner";
import Stats from "@/components/modules/home/Stats";
import FeaturedCategories from "@/components/modules/home/FeaturedCategories";
import FeaturedIdeas from "@/components/modules/home/FeaturedIdeas";
import { getCategories } from "@/actions/category";
import { getIdeas } from "@/actions/idea";
import HowItWorks from "@/components/modules/home/HowItWorks";
import { IdeaStatus } from "@/types/enums";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categoriesPromise, ideasPromise] = await Promise.all([
    getCategories({
      limit: "3",
    }),
    getIdeas({
      limit: "3",
      status: IdeaStatus.PUBLISHED,
    }),
  ]);

  const categories = categoriesPromise.data || [];
  const ideas = ideasPromise.data || [];

  return (
    <>
      <Banner />

      <Stats />

      <FeaturedCategories categories={categories} />

      <FeaturedIdeas ideas={ideas} />

      <HowItWorks />
    </>
  );
}
