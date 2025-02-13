import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
// import Product from "./db/models/product.models";

// Common
const Price = (field: string) =>
  z.coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)), // Исправлено регулярное выражение
      {
        message: `${field} должно быть ровно два знака после запятой (например, 49.99).`,
      }
    );

    export const ProductInputSchema = z.object({
      name: z.string().min(3, 'Имя должно содержать не менее 3 символов'),
      slug: z.string().min(3, 'Слог должен содержать не менее 3 символов'),
      category: z.string().min(1, 'Категория обязательна'),
      images: z.array(z.string()).min(1, 'Продукт должен иметь хотя бы одно изображение'),
      brand: z.string().min(1, 'Требуется бренд'),
      description: z.string().min(1, 'Требуется описание'),
      isPublished: z.boolean(),
      price: Price('Цена'),
      listPrice: Price('Указанная цена'),
      countInStock: z.coerce
        .number()
        .int()
        .nonnegative('количество на складе должно быть неотрицательным числом'),
      tags: z.array(z.string()).default([]),
      sizes: z.array(z.string()).default([]),
      colors: z.array(z.string()).default([]),
      avgRating: z.coerce
        .number()
        .min(0, 'Средняя оценка должна быть не менее 0')
        .max(5, 'Средняя оценка должна быть не более 5'),
      numReviews: z.coerce
        .number()
        .int()
        .nonnegative('Количество отзывов должно быть неотрицательным числом'),
      ratingDistribution: z
        .array(z.object({ rating: z.number(), count: z.number() }))
        .max(5),
      reviews: z.array(z.string()).default([]),
      numSales: z.coerce
        .number()
        .int()
        .nonnegative('Количество продаж должно быть неотрицательным числом'),
    })

    // Order Item
    export const OrderItemSchema = z.object({
      clientId: z.string().min(1, 'Требуется clientId'),
      product: z.string().min(1, 'Требуется товар'),
      name: z.string().min(1, 'Требуется название'),
      slug: z.string().min(1, 'Требуется slug'),
      category: z.string().min(1, 'Требуется категория'),
      quantity: z
        .number()
        .int()
        .nonnegative('Величина должна быть неотрицательным числом'),
      countInStock: z
        .number()
        .int()
        .nonnegative('Quantity must be a non-negative number'),
      image: z.string().min(1, 'Требуется изображение'),
      price: Price('Цена'),
      size: z.string().optional(),
      color: z.string().optional(),
    })

    export const CartSchema = z.object({
      items: z
        .array(OrderItemSchema)
        .min(1, 'Заказ должен содержать хотя бы один товар'),
        itemsPrice: z.number(),

        taxPrice: z.optional(z.number()),
        shippingPrice: z.optional(z.number()),
        totlaPrice: z.number(),
        paymentMethod: z.optional(z.string()),
        deliveryDateIndex: z.optional(z.number()),
        expectedDelivaryDate: z.optional(z.date())
    })