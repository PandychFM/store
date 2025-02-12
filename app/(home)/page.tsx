import { HomeCard } from "@/components/shared/home/home-card";
import { HomeCarousel } from "@/components/shared/home/home-carousel";
import ProductSlider from "@/components/shared/product/product-slider";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllCategories,
  getProductsByTag,
  getProductsForCard,
} from "@/lib/actions/product-actions";
import data from "@/lib/data";
import { toSlug } from "@/lib/utils";

export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({
    tag: "new-arrival",
    limit: 4,
  });
  const featureds = await getProductsForCard({
    tag: "featured",
    limit: 4,
  });
  const bestSellers = await getProductsForCard({
    tag: "best-seller",
    limit: 4,
  });
  const cards = [
    {
      title: "Категории для изучения",
      link: {
        text: "Найти больше",
        href: "/search",
      },
      items: categories.map((category) => ({
        name: category,
        image: `/image/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: "Исследуйте новые поступления",
      items: newArrivals,
      link: {
        text: "Увидеть всё",
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: "Откройте для себя бестселлеры",
      items: bestSellers,
      link: {
        text: "Увидеть всё",
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: "Рекомендуемые продукты",
      items: featureds,
      link: {
        text: "Увидеть всё",
        href: "/search?tag=new-arrival",
      },
    },
  ];

  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })

  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className="md:p-4 md:space-y-4 bg-border">
        <HomeCard cards={cards} />

        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider title={"Сегодняшние предложения"} products={todaysDeals}/>
          </CardContent>
        </Card>

        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider
              title="Самые продаваемые товары"
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
