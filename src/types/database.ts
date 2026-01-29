
export interface Subscriber {
  id: string;
  name: string;
  phone: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'disconnected';
  expiration_date: string;
  household_count: number;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: string;
  subscriber_id: string;
  appliance_name: string;
  power_watts: number;
  quantity: number;
  estimated_hours_per_day: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  subscriber_id: string;
  amount: number;
  transaction_date: string;
  cashier_id: string;
  receipt_number: string;
  qr_code: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'agent' | 'cashier';
  created_at: string;
}

export interface AuditLog {
  id: string;
  subscriber_id: string;
  user_id: string;
  action: string;
  old_value: string | null;
  new_value: string | null;
  timestamp: string;
}

export interface OfflineData {
  id: string;
  data_type: 'subscriber' | 'transaction' | 'inventory';
  data: any;
  synced: boolean;
  created_at: string;
}

export interface SubscriptionCalculation {
  total_power_watts: number;
  monthly_consumption_kwh: number;
  base_price: number;
  final_price: number;
  household_count: number;
}