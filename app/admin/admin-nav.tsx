'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const links = [
  {
    title: 'Обзор',
    href: '/admin/overview',
  },
  {
    title: 'Товары',
    href: '/admin/products',
  },
  {
    title: 'Заказы',
    href: '/admin/orders',
  },
  {
    title: 'Пользователи',
    href: '/admin/users',
  },
  {
    title: 'Страницы',
    href: '/admin/web-pages',
  },
  {
    title: 'Настройки',
    href: '/admin/settings',
  },
]
export function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        'flex items-center flex-wrap overflow-hidden gap-2 md:gap-4',
        className
      )}
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            '',
            pathname.includes(item.href) ? '' : 'text-muted-foreground'
          )}
        >
          {(item.title)}
        </Link>
      ))}
    </nav>
  )
}