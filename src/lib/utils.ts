
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function isSubscriptionExpired(expirationDate: string): boolean {
  return new Date(expirationDate) < new Date();
}

export function getSubscriptionStatus(expirationDate: string): 'active' | 'expired' | 'warning' {
  const expDate = new Date(expirationDate);
  const today = new Date();
  const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiration < 0) return 'expired';
  if (daysUntilExpiration <= 7) return 'warning';
  return 'active';
}

export function calculateSubscription(
  inventoryItems: Array<{ power_watts: number; quantity: number; estimated_hours_per_day: number }>,
  householdCount: number,
  unitRate: number = 100 // Price per kWh in XAF
): {
  totalPowerWatts: number;
  monthlyConsumptionKwh: number;
  basePrice: number;
  finalPrice: number;
} {
  const totalPowerWatts = inventoryItems.reduce(
    (sum, item) => sum + (item.power_watts * item.quantity),
    0
  );
  
  const averageHoursPerDay = inventoryItems.length > 0
    ? inventoryItems.reduce((sum, item) => sum + item.estimated_hours_per_day, 0) / inventoryItems.length
    : 0;
  
  const monthlyConsumptionKwh = (totalPowerWatts * averageHoursPerDay * 30) / 1000;
  const basePrice = monthlyConsumptionKwh * unitRate;
  const finalPrice = basePrice * householdCount;
  
  return {
    totalPowerWatts,
    monthlyConsumptionKwh,
    basePrice,
    finalPrice,
  };
}