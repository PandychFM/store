import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

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
      // sizes: z.array(z.string()).default([]),
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