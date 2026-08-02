import Categories from "@/components/modules/home/Categories";
import Banner from "@/components/modules/home/Banner";
import Stats from "@/components/modules/home/Stats";
import HowItWorks from "@/components/modules/home/HowItWorks";
import { getCategories } from "@/actions/category";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data: categories } = await getCategories({
    limit: "3",
  });

  return (
    <>
      <Banner />

      <Stats />

      <Categories categories={categories || []} />

      <HowItWorks />
    </>
  );
}
