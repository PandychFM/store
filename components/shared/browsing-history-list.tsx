'use client'

import useBrowsingHistory from "@/hooks/use-browsing-history"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import React, { useEffect } from "react"
import ProductSlider from "./product/product-slider"

export default function BrowsingHistoryList({
  className,
} : {
  className?: string
}) {
  const {products} = useBrowsingHistory()
  return (
    products.length !== 0 && (
      <div className="bg-background">
        <Separator className={cn('mb-4', className)} />
        <ProductList
          title={"Связанные с элементами, которые вы просматривали"}
          type='related'
        />
        <Separator className="mb-4" />
        <ProductList
          title={'Ваша история посещаемых страниц'}
          hideDetails
          type='history'       
        />
      </div>
    )
  )
}

function ProductList({
  title,
  type = 'history',
  hideDetails = false,
} : {
  title: string
  type: 'history' | 'related'
  hideDetails?: boolean 
}) {
  const { products } = useBrowsingHistory()
  const [data, setData] = React.useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&categories=${products
          .map((product) => product.category)
          .join(',')}&ids=${products.map((products) => products.id).join(',')}`
      )
      const data = await res.json()
      setData(data)
    }
    fetchProducts()
  }, [products, type])

  return (
    data.length > 0 && (
      <ProductSlider title={title} products={data} hideDetails={hideDetails} />
    )
  )
}