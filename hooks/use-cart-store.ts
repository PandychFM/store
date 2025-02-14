import { calcDeliveryDateAnPrice } from "@/lib/actions/order.actions";
import { Cart, OrderItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  totlaPrice: 0,
  paymentMethod: undefined,
  deliveryDateIndex: undefined
}

interface CartState {
  cart: Cart
  addItem: (item: OrderItem, quantity: number) => Promise<string | undefined>;

  updateItem: (item: OrderItem, quantity: number) => Promise<void>
  removeItem: (item: OrderItem) => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialState,

      addItem: async (item: OrderItem, quantity: number) => {
        const { items } = get().cart
        const existItem = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )

        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error('Недостаточно товаров на складе')
          }
        } else {
          if (item.countInStock < item.quantity) {
            throw new Error('Недостаточно товаров на складе')
          }
        }

        const updatedCartItems = existItem
         ? items.map((x) =>
          x.product === item.product &&
          x.color === item.color &&
          x.size === item.size
            ? { ...existItem, quantity: existItem.quantity + quantity}
            : x
        ) 
        : [ ...items, { ...item, quantity } ]

       set ({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAnPrice({
              items: updatedCartItems,
            })),
          },
       })
       // exlit-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
       return updatedCartItems.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
       ) ?.clientId
      },
      updateItem: async (item: OrderItem, quantity: number) => {
        const { items } = get().cart
        const exist = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )
        if (!exist) return 
        const updateCartItems = items.map((x) => 
          x.product === item.product &&
          x.color === item.color &&
          x.size === item.size
            ? { ...exist, quantity: quantity}
            : x
        )
        set({
          cart: {
            ...get().cart,
            items: updateCartItems,
            ...(await calcDeliveryDateAnPrice({
              items: updateCartItems,
            })),
          },
        })
      },
      removeItem: async (item: OrderItem) => {
        const { items } = get().cart
        const updateCartItems = items.filter(
          (x) => 
            x.product !== item.product ||
            x.color !== item.color ||
            x.size !== item.size
        )
        set({
          cart: {
            ...get().cart,
            items: updateCartItems,
            ...(await calcDeliveryDateAnPrice({
              items: updateCartItems
            }))
          }
        })
      },
      init: () => set({ cart: initialState})
    }),
    {
      name: 'cart-store'
    }
  )
)

export default useCartStore