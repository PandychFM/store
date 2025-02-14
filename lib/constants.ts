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