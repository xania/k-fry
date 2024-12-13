export interface OrderModel {
  checkbox: Record<string, OptionModel>;
  radio: Record<string, RadioModel>;
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