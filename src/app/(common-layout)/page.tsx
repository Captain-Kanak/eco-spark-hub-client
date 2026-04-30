import { getCategories } from "@/actions/category.action";
import Categories from "@/components/modules/home/Categories";
import Hero from "@/components/modules/home/Hero";
import Stats from "@/components/modules/home/Stats";

export default async function HomePage() {
  const { data: categories } = await getCategories();

  return (
    <>
      <Hero />
      <Stats />
      <Categories categories={categories || []} />
    </>
  );
}
