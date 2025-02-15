export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "divan.ru"
export const APP_SLOGAN = process.env.NEXT_PUBLIC_APP_SLOGAN || "Тратьте меньше, получайте больше удовольствия."
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Самый лучший магазин в мире."

export const APP_COPYRIGHT = 
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
    `Copyright © 2025 ${APP_NAME}. Все права защищены.`

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
)

export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: 'PayPal',
    commission: 0,
    isDefault: true,
  },
  {
    name: 'Stripe',
    commission: 0,
    isDefault: true,
  },
  {
    name: 'Наложенный платеж',
    commission: 0,
    isDefault: true,
  }
]
export const DEFAULT_PAYMENT_METHOD = 
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'

  export interface DeliveryDateOption {
    name: string;
    daysToDeliver: number;
    shippingPrice: number;
    freeShippingMinPrice: number;
  }
  
  export const AVAILABLE_DELIVERY_DATES: DeliveryDateOption[] = [
    {
      name: "Завтра",
      daysToDeliver: 1,
      shippingPrice: 12.9,
      freeShippingMinPrice: 0,
    },
    {
      name: "Следующие три дня",
      daysToDeliver: 3,
      shippingPrice: 6.9,
      freeShippingMinPrice: 0,
    },
    {
      name: "Следующие 5 дней",
      daysToDeliver: 5,
      shippingPrice: 4.9,
      freeShippingMinPrice: 35,
    },
  ];
  