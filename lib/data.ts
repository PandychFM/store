const data = {
  headerMenus: [
    {
      name: "Сегодняшняя скидка",
      href: '/search?tag=todays-deal',
    },
    {
      name: 'Новые товары',
      href: '/search?tag=new-arrival',
    },
    {
      name: 'Рекомендуемые товары',
      href: '/search?tag=featured',
    },
    {
      name: 'Лидеры продаж',
      href: '/search?tag=best-seller',
    },
    {
      name: 'Популярные категории',
      href: '/#browsing-history',
    },
    {
      name: 'Обслуживание клиентов',
      href: '/page/customer-service',
    },
    {
      name: 'О нас',
      href: '/page/about-us',
    },
    {
      name: 'Помощь',
      href: '/page/help',
    },
  ],
  carousels: [
    {
      // title: 'Most Popular Shoes For Sale',
      buttonCaption: 'Купи сейчас',
      image: '/images/banner3.webp',
      url: '/search?category=Диваны',
      isPublished: true,
    },
    {
      // title: 'Best Sellers in T-Shirts',
      buttonCaption: 'Купи сейчас',
      image: '/images/banner1.webp',
      url: '/search?category=Матрасы',
      isPublished: true,
    },
    {
      // title: 'Best Deals on Wrist Watches',
      buttonCaption: 'Узнать больше',
      image: '/images/banner2.webp',
      url: '/search?category=Диваны',
      isPublished: true,
    },
  ],
}

export default data;