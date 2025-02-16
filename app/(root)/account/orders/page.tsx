import BrowsingHistoryList from "@/components/shared/browsing-history-list"
import Pagination from "@/components/shared/pagination"
import ProductPrice from "@/components/shared/product/product-price"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getMyOrders } from "@/lib/actions/order.actions"
import { IOrder } from "@/lib/db/models/order.model"
import { formatDateTime, formatId } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"


const PAGE_TITLE = 'Ваши заказы'
export const metadata: Metadata = {
  title: PAGE_TITLE
}

export default async function OrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const orders = await getMyOrders({
    page,
  })
  return (
    <div>
      <div className="flex gap-2">
        <Link href='/account'>Ваш аккаунт</Link>
        <span>{'>'}</span>
        <span>{PAGE_TITLE}</span>
      </div>
      <h1 className="h1-bold pt-4">{PAGE_TITLE}</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Номер</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Оплачено</TableHead>
              <TableHead>Доставлено</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.lenght === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="">
                   У вас нет заказов
                </TableCell>
              </TableRow>
            )}
            {orders.data.map((order: IOrder) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Link href={`/account/orders/${order._id}`}>
                    {formatId(order._id)}
                  </Link>
                </TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt!).dateTime}
                </TableCell>
                <TableCell>
                  <ProductPrice price={order.totalPrice} plain/>
                </TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : 'Нет'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "Нет"}
                </TableCell>
                <TableCell>
                  <Link href={`/account/orders/${order._id}`}>
                    <span className="px-2">Детали</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          <Pagination page={page} totalPages={orders?.totalPages!} />
        )}
      </div>
      <BrowsingHistoryList className="mt-16" />
    </div>
  )
}