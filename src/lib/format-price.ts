export function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Sob consulta'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
