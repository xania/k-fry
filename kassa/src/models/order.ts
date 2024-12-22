export interface OrderModel {
  checkbox: Record<string, OptionModel>;
  radio: Record<string, RadioModel>;
  counters: Record<string, CounterModel>;
  description: string;
  count: number;
  unitPrice: number;
}

export interface OptionModel {
  price: number;
}

export interface RadioModel {
  title: string;
  price: number;
}

export interface CounterModel {
  count: number;
  unitPrice: number;
}

export type TransactionModel = {
  id: string;
  orders: OrderModel[];
};
