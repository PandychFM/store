import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
// import Product from "./db/models/product.models";

// Common
const MongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid MongoDB ID" });

const Price = (field: string) =>
  z.coerce.number().refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)), // Исправлено регулярное выражение
    {
      message: `${field} должно быть ровно два знака после запятой (например, 49.99).`,
    }
  );

export const ProductInputSchema = z.object({
  name: z.string().min(3, "Имя должно содержать не менее 3 символов"),
  slug: z.string().min(3, "Слог должен содержать не менее 3 символов"),
  category: z.string().min(1, "Категория обязательна"),
  images: z
    .array(z.string())
    .min(1, "Продукт должен иметь хотя бы одно изображение"),
  brand: z.string().min(1, "Требуется бренд"),
  description: z.string().min(1, "Требуется описание"),
  isPublished: z.boolean(),
  price: Price("Цена"),
  listPrice: Price("Указанная цена"),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative("количество на складе должно быть неотрицательным числом"),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce
    .number()
    .min(0, "Средняя оценка должна быть не менее 0")
    .max(5, "Средняя оценка должна быть не более 5"),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative("Количество отзывов должно быть неотрицательным числом"),
  ratingDistribution: z
    .array(z.object({ rating: z.number(), count: z.number() }))
    .max(5),
  reviews: z.array(z.string()).default([]),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative("Количество продаж должно быть неотрицательным числом"),
});

// Order Item
export const OrderItemSchema = z.object({
  clientId: z.string().min(1, "Требуется clientId"),
  product: z.string().min(1, "Требуется товар"),
  name: z.string().min(1, "Требуется название"),
  slug: z.string().min(1, "Требуется slug"),
  category: z.string().min(1, "Требуется категория"),
  quantity: z
    .number()
    .int()
    .nonnegative("Величина должна быть неотрицательным числом"),
  countInStock: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative number"),
  image: z.string().min(1, "Требуется изображение"),
  price: Price("Цена"),
  size: z.string().optional(),
  color: z.string().optional(),
});
export const ShippingAddressSchema = z.object({
  fullName: z.string().min(1, "Требуется полное имя"),
  street: z.string().min(1, "Требуется указать адрес"),
  city: z.string().min(1, "Требуется город"),
  postalCode: z.string().min(1, "Требуется указать почтовый индекс"),
  province: z.string().min(1, "Требуется провинция"),
  phone: z.string().min(1, "Требуется указать номер телефона"),
  country: z.string().min(1, "Требуется страна"),
});
// Order
export const OrderInputSchema = z.object({
  user: z.union([
    MongoId,
    z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  ]),
  items: z
    .array(OrderItemSchema)
    .min(1, "Заказ должен содержать хотя бы один товар"),
  shippingAddress: ShippingAddressSchema,
  paymentMethod: z.string().min(1, "Требуется способ оплаты"),
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      email_address: z.string(),
      pricePaid: z.string(),
    })
    .optional(),
  itemsPrice: Price("Цена товара"),
  shippingPrice: Price("Стоимость доставки"),
  taxPrice: Price("Налоговая цена"),
  totalPrice: Price("Итоговая цена"),
  expectedDeliveryDate: z
    .date()
    .refine(
      (value) => value > new Date(),
      "Ожидаемая дата доставки должна быть в будущем"
    ),
  isDelivered: z.boolean().default(false),
  deliveredAt: z.date().optional(),
  isPaid: z.boolean().default(false),
  paidAt: z.date().optional(),
});

// Cart

export const CartSchema = z.object({
  items: z
    .array(OrderItemSchema)
    .min(1, "Заказ должен содержать хотя бы один товар"),
  itemsPrice: z.number(),

  taxPrice: z.optional(z.number()),
  shippingPrice: z.optional(z.number()),
  totalPrice: z.number(),
  paymentMethod: z.optional(z.string()),
  deliveryDateIndex: z.optional(z.number()),
  expectedDeliveryDate: z.optional(z.date()),
  shippingAddress: z.optional(ShippingAddressSchema),
});

// USER
const UserName = z
  .string()
  .min(2, { message: "Имя пользователя должно содержать не менее 2 символов" })
  .max(50, {
    message: "Длина имени пользователя должна составлять не более 30 символов",
  });
const Email = z
  .string()
  .min(1, "Требуется электронная почта")
  .email("Адрес электронной почты недействителен");
const Password = z
  .string()
  .min(3, "Пароль должен содержать не менее 3 символов");
const UserRole = z.string().min(1, "требуется роль");

export const UserInputSchema = z.object({
  name: UserName,
  email: Email,
  image: z.string().optional(),
  emailVerified: z.boolean(),
  role: UserRole,
  password: Password,
  paymentMethod: z.string().min(1, "Требуется способ оплаты"),
  address: z.object({
    fullName: z.string().min(1, "Требуется полное имя"),
    street: z.string().min(1, "Требуется улица"),
    city: z.string().min(1, "Требуется город"),
    province: z.string().min(1, "Требуется провинция"),
    postalCode: z.string().min(1, "Требуется указать почтовый индекс"),
    country: z.string().min(1, "Требуется страна"),
    phone: z.string().min(1, "Требуется указать номер телефона"),
  }),
});

export const UserSignInSchema = z.object({
  email: Email,
  password: Password,
});

export const UserSignUpSchema = UserSignInSchema.extend({
  name: UserName,
  confirmPassword: Password,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});
