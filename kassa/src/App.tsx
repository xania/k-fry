import type { Accessor, Component } from "solid-js";
import { BiRegularPlus, BiRegularX as Remove } from "solid-icons/bi";
import { createSelector, createSignal, For } from "solid-js";
import { OrderModel, RadioModel } from "./models/order";

// const initialOrder: OrderModel = {
//   description: "Burger",
//   count: 1,
//   checkbox: {},
//   radio: {},
//   unitPrice: 1,
// };

const [items, setItems] = createSignal<OrderModel[]>([]);

const [selectedOrder, setSelectedOrder] = createSignal<
  OrderModel | undefined
>();
//  initialOrder

function addItem(cat: CategoryModel) {
  const newOrder: OrderModel = {
    count: 1,
    description: cat.name,
    checkbox: {},
    radio: {},
    unitPrice: cat.price,
  };
  setItems((prev) => [...prev, newOrder]);
  setSelectedOrder(newOrder);
}

function removeItem(index: number) {
  const selected = selectedOrder();
  setItems((arr) => {
    const toBeRemoved = arr[index];
    if (selected === toBeRemoved) {
      setSelectedOrder(undefined);
    }

    return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
  });

  return false;
}

interface CategoryModel {
  name: string;
  price: number;
}

const menuCategories: CategoryModel[] = [
  { name: "Burger", price: 5.95 },
  { name: "Boneless chicken", price: 5.95 },
  { name: "Hotwings", price: 5.95 },
  // { name: "Kipstuk (3x)", price: 5 },
];

const bowlsCategory: CategoryModel = { name: "Bowls", price: 5.45 };
const drinksCategory: CategoryModel = { name: "Koude dranken", price: 1 };

const App: Component = () => {
  return (
    <div class="h-full flex flex-col">
      <div class="flex p-3 gap-4">
        {menuCategories.map((cat) => (
          <Category model={cat}></Category>
        ))}
        <Category model={bowlsCategory}></Category>
        <Category model={drinksCategory}></Category>
        <span class="flex-1"></span>
        <button
          onclick={() => {
            setItems([]);
            setSelectedOrder(undefined);
          }}
        >
          clear
        </button>
        <Totals />
      </div>
      <div class="border-white box-border flex overflow-hidden h-full">
        <div class="p-4 w-72 shadow-2xl overflow-auto">
          <For each={items()}>
            {(item, index) => (
              // rendering logic for each element
              <Order model={item} index={index}></Order>
            )}
          </For>
        </div>
        <div
          class="flex h-full flex-1 overflow-auto"
          classList={{ hidden: !selectedOrder() }}
        >
          <Bar categories={[...menuCategories, bowlsCategory]}>
            <Card>
              <Header>American style</Header>
              <Options
                name="saus"
                items={[
                  { title: "Kentucky style", price: 0 },
                  { title: "Nashville style", price: 0 },
                ]}
              ></Options>
            </Card>
            <Card>
              <Header>Korean style</Header>
              <Options
                name="saus"
                items={[
                  { title: "Gochujang", price: 1 },
                  { title: "Honey Lemon", price: 1 },
                  { title: "Soy Garlic", price: 1 },
                ]}
              ></Options>
            </Card>
          </Bar>
          <Bar categories={[...menuCategories, bowlsCategory]}>
            <Card>
              <Header>Friet</Header>
              <Options
                name="friet"
                items={[
                  { title: "Normaal", price: 2.5 },
                  { title: "Zoete Aardappelen", price: 3 },
                ]}
              ></Options>
            </Card>
            <Card>
              <Header>Saus</Header>
              <Checkbox title="Mayo" price={0.6} />
              <Checkbox title="Ketchup" price={0.6} />
              <Checkbox title="K-Fry" price={0.9} />
              <Checkbox title="Mexican" price={0.9} />
              <Checkbox title="Soy Garlic" price={0.9} />
              <Checkbox title="Honey Lemon" price={0.9} />
            </Card>
          </Bar>
          <Bar categories={[...menuCategories, bowlsCategory, drinksCategory]}>
            <Card>
              <Header>Koude Dranken</Header>
              <Checkbox title="Cola" price={1.5} />
              <Checkbox title="Fernandes rood" price={1.5} />
              <Checkbox title="Fernandes groen" price={1.5} />
              <Checkbox title="Fernandes blauw" price={1.5} />
              <Checkbox title="Redbul" price={2} />
              <Checkbox title="Oasis Rood" price={1.5} />
              <Checkbox title="Oasis Orange" price={1.5} />
            </Card>
          </Bar>
        </div>
      </div>
    </div>
  );
};

const Header: Component<{ children: any }> = (props) => {
  return (
    <h3 style="font-variant: small-caps;" class="font-bold text-gray-400">
      {props.children}
    </h3>
  );
};

const Bar: Component<{ categories: CategoryModel[]; children?: any }> = (
  props
) => {
  function isActive() {
    const order = selectedOrder();
    return order && !props.categories.find((c) => c.name === order.description);
  }
  return (
    <div class="w-60" classList={{ hidden: isActive() }}>
      {props.children}
    </div>
  );
};

interface CardProps {
  children: any;
}
const Card: Component<CardProps> = (props: CardProps) => (
  <div class="p-2 border border-solid m-2 shadow-md block">
    {props.children}
  </div>
);

const Category: Component<{ model: CategoryModel }> = (props) => (
  <button
    class="inline-flex shadow-md items-center p-2"
    onClick={() => addItem(props.model)}
  >
    <span class="m-auto text-sm">{props.model.name}</span>
    <span class="m-auto ml-2">
      <BiRegularPlus size={16} color="#000000" />
    </span>
  </button>
);

const Label: Component<{ id: string; children: any }> = (props) => (
  <label
    for={props.id}
    class="inline-flex w-full p-2 shadow cursor-pointer hover:text-blue-800"
  >
    {props.children}
  </label>
);

interface OptionsProps {
  items: RadioModel[];
  name: string;
}
const Options: Component<OptionsProps> = (props) => {
  return props.items.map((item, i) => {
    const id = "_" + Math.random();
    function onOptionChange(b: boolean) {
      const order = selectedOrder();
      if (b && order) {
        console.log(props.name, item.title, order.description);
        order.radio[props.name] = item;

        refreshItems();
      }
    }
    function isChecked() {
      const order = selectedOrder();
      if (!order) return false;

      return order.radio[props.name] == item;
    }

    return (
      <div>
        <Label id={id}>
          <span class="mr-auto text-sm">{item.title}</span>
          <input
            id={id}
            type="radio"
            name={props.name}
            checked={isChecked()}
            onChange={(e) => onOptionChange(e.target.checked)}
          ></input>
        </Label>
      </div>
    );
  });
};

const Checkbox: Component<{ title: string; price: number }> = (props) => {
  function isChecked() {
    const order = selectedOrder();
    if (!order) return false;

    return !!order.checkbox[props.title];
  }
  function setChecked(e: Event) {
    const target = e.target as HTMLInputElement | null;
    const order = selectedOrder();
    if (order && target) {
      if (target.checked) {
        order.checkbox[props.title] = { price: props.price };
      } else {
        delete order.checkbox[props.title];
      }
      refreshItems();
    }
  }
  const id = "_" + Math.random();
  return (
    <Label id={id}>
      <span class="mr-auto text-sm">{props.title}</span>
      <input
        id={id}
        type="checkbox"
        checked={isChecked()}
        onChange={setChecked}
      ></input>
    </Label>
  );
};

const Order: Component<OrderProps> = (props) => {
  const orderId = Math.random().toString();
  const isSelected = createSelector(selectedOrder);
  return (
    <label
      for={orderId}
      classList={{ "border-green-500": isSelected(props.model) }}
      class="my-2 border-2 inline-flex w-full p-3 shadow cursor-pointer hover:text-blue-800"
      onClick={() => setSelectedOrder(props.model)}
    >
      <div class="inline-flex items-center w-full">
        <span class="mr-auto">{props.model.description}</span>
        <button
          class="border rounded-md text-red-400 p-1 text-xl"
          onClick={(e) => {
            removeItem(props.index());
            e.stopPropagation();
          }}
        >
          <Remove />
        </button>
      </div>
    </label>
  );
};

interface OrderProps extends Record<string, any> {
  model: OrderModel;
  index: Accessor<number>;
}

function getOrderPrice(order: OrderModel) {
  var resultPrice = order.count * order.unitPrice;

  for (const o of Object.values(order.checkbox)) {
    resultPrice += o.price;
  }

  for (const r of Object.values(order.radio)) {
    resultPrice += r.price;
  }

  return resultPrice;
}

const Totals: Component = () => {
  type Sum = { amount: number; tax: number };
  function totalAmount(): Sum {
    return items().reduce<Sum>(
      (p, c) => ({
        amount: p.amount + getOrderPrice(c),
        tax: 1,
      }),
      { amount: 0, tax: 0 }
    );
  }

  return (
    <button
      onclick={() => setItems((x) => [...x])}
      class="bg-blue-950 p-2 shadow-xl rounded px-4 text-white"
    >
      &euro; {totalAmount().amount.toFixed(2)}
    </button>
  );
};

function refreshItems() {
  setItems((x) => [...x]);
}

export default App;
