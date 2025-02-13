/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useCartStore from "@/hooks/use-cart-store"
import { useToast } from "@/hooks/use-toast"
import { OrderItem } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddToCart({
  item,
  minimal = false,
} : {
  item: OrderItem
  minimal?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()

  const { addItem } = useCartStore()

  const [quantity, setQuantity] = useState(1)

  return minimal ? (
    <Button
      className="rounded-full"
      onClick={() => {
        try {
          addItem(item, 1)
          toast({
            description: 'Добавлено в корзину',
            action: (
              <Button
                onClick={() => {
                  router.push('/cart')
                }}
              >
                Зайти в корзину
              </Button>
            ),
          })
        } catch (error: any) {
          toast({
            variant: 'destructive',
            description: error.message,
          })
        }
      }}
    >
      Добавить в корзину
    </Button>
  ) : (
    <div className="w-full space-y-2">
      <Select
        value={quantity.toString()}
        onValueChange={(i) => setQuantity(Number(i))}
      >
        <SelectTrigger className="">
          <SelectValue>Количество: {quantity}</SelectValue>
        </SelectTrigger>
        <SelectContent position='popper'>
          {Array.from({ length: item.countInStock }).map((_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="rounded-full w-full"
        type='button'
        onClick={async () => {
          try {
            const itemId = await addItem(item, quantity)
            router.push(`/cart/${itemId}`)
          } catch (error: any) {
            toast({
              variant: 'destructive',
              description: error.message,
            })
          }
        }}
      >
        Добавить в корзину
      </Button> 
      <Button
        variant='secondary'
        onClick={() => {
          try {
            addItem(item, quantity)
            router.push('/checkout')
          } catch (error: any) { 
            toast({
              variant: 'destructive',
              description: error.message,
            })
          }
        }}
        className="w-full rounded-full"
      >
        Купить сейчас
      </Button>
    </div>
  )
}