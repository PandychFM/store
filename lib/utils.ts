import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.slice(0, 2)}` : int
}

export const toSlug = (text: string): string => 
  text
    .toLocaleLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');

const CUURENCY_FORMATTER = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency',
  minimumFractionDigits: 2
})
export function formatCurrency(amount: number) {
  return CUURENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('ru-RU')
export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export const generateId = () => 
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join('')