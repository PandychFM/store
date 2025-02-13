import CardAddItem from "./cart-add-item"

export default async function CardAddItemPage(props: {
  params: Promise<{ itemId: string }>
}) {
  const { itemId } = await props.params

  return <CardAddItem itemId={itemId} />
}