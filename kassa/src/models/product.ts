import { CheckboxModel, RadioModel } from "./order";

export const colaPrice = 2.5;
export const frietPrice = 3;
export const drankDiscount = 0.5;
export const frietDiscount = 1;

export interface CategoryModel {
  name: string;
  price: number;
}

export const burgerCategory: CategoryModel = { name: "Burgers", price: 6.99 };
export const wrapCategory: CategoryModel = { name: "Wrap", price: 6.99 };
export const drumsticksCategory: CategoryModel = { name: "2x Drumsticks", price: 6.99 };
export const bonelessCategory: CategoryModel = {
  name: "Boneless",
  price: 6.99,
};
export const hotwingsCategory: CategoryModel = {
  name: "Hotwings",
  price: 6.99,
};
export const bowlsCategory = {
  name: "Bowls",
  price: 8.99,
  vulling: [
    { title: "Friet", price: frietPrice },
    { title: "Rijst", price: frietPrice + 1 },
    { title: "Zoete aardappelen", price: frietPrice + 1 },
  ],
};
export const freeChoiceCategory: CategoryModel = {
  name: "Free Choice",
  price: 0,
};

export const americanStyle: RadioModel[] = [
  { title: "Kentucky style", price: 0 },
  { title: "Nashville style", price: 0 },
];

export const grams: RadioModel[] = [
  { title: "160g", price: 0 },
  { title: "300g", price: 1 },
];

export const koreanStyle: RadioModel[] = [
  { title: "Gochujang", price: 1 },
  { title: "Honey Lemon", price: 1 },
  { title: "Soy Garlic", price: 1 },
];

export const menuFriet: CheckboxModel[] = [
  { title: "Normaal", price: frietPrice },
  { title: "Zoete aardappelen", price: frietPrice + 1 },
  { title: "Rijst", price: frietPrice + 1 },
];

export const koudeDranken: CheckboxModel[] = [
  { title: "Cola", price: colaPrice },
  { title: "Fernandes rood", price: colaPrice },
  { title: "Fernandes groen", price: colaPrice },
  { title: "Fernandes blauw", price: colaPrice },
  { title: "Redbul", price: 3 },
  { title: "Oasis Rood", price: colaPrice },
  { title: "Oasis Orange", price: colaPrice },
  { title: "Spa", price: colaPrice },
];

export const snacks: CheckboxModel[] = [
  { title: "Koolsla", price: 2.5 },
  { title: "Friet", price: frietPrice },
  { title: "Gekruide friet", price: 3.5 },
  { title: "Rijst", price: 3.5 },
  { title: "Zoete aardappelen friet", price: 4 },
  { title: "3x Hotwings", price: 3.25 },
  { title: "3x Boneless", price: 3.25 },
];

export const sauses: CheckboxModel[] = [
  { title: "Mayo", price: 0.6 },
  { title: "Ketchup", price: 0.6 },
  { title: "K-Fry", price: 0.9 },
  { title: "Mexican", price: 0.9 },
  { title: "Soy Garlic", price: 0.9 },
  { title: "Honey Lemon", price: 0.9 },
];
