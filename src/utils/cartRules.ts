export const PROMO_CODE = "10X10";
export const PROMO_PERCENT = 10;
export const FREE_SHIPPING_FROM = 100;
export const SHIPPING_COST = 10;

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}