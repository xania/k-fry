import type { Accessor, Component } from "solid-js";
import {
  BiRegularPlus,
  BiSolidDownArrow,
  BiRegularX as Remove,
} from "solid-icons/bi";
import {
  createEffect,
  createSelector,
  createSignal,
  For,
  Show,
} from "solid-js";
import { CounterModel, OrderModel, RadioModel } from "./models/order";

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
    counters: {},
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
  { name: "Menu dranken", price: 1 },
];

const bowlsCategory: CategoryModel = { name: "Bowls", price: 5.45 };
const freeChoiceCategory: CategoryModel = { name: "Free Choice", price: 0 };

const PosApp: Component = () => {
  return (
    <div class="h-full flex">
      <div class="h-full flex-1 flex flex-col">
        <div class="flex p-3 gap-4">
          {menuCategories.map((cat) => (
            <Category model={cat}></Category>
          ))}
          <Category model={bowlsCategory}></Category>
          <Category model={freeChoiceCategory}></Category>
          <span class="flex-1"></span>
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
                  name="style"
                  items={[
                    { title: "Kentucky style", price: 0 },
                    { title: "Nashville style", price: 0 },
                  ]}
                ></Options>
              </Card>
              <Card>
                <Header>Korean style</Header>
                <Options
                  name="style"
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
            <Bar categories={[...menuCategories, bowlsCategory]}>
              <Card>
                <Header>Koude Dranken</Header>
                <Checkbox title="Cola" price={1.5} />
                <Checkbox title="Fernandes rood" price={1.5} />
                <Checkbox title="Fernandes groen" price={1.5} />
                <Checkbox title="Fernandes blauw" price={1.5} />
                <Checkbox title="Redbul" price={2} />
                <Checkbox title="Oasis Rood" price={1.5} />
                <Checkbox title="Oasis Orange" price={1.5} />
                <Checkbox title="Spa" price={1.5} />
              </Card>
            </Bar>
            <Bar categories={[freeChoiceCategory]}>
              <Card>
                <Header>Snacks</Header>
                <Counter title="Koolsla" price={2.5} />
                <Counter title="Friet" price={3} />
                <Counter title="Gekruide friet" price={3.5} />
                <Counter title="Zoete aardappelen friet" price={4} />
                <Counter title="3x Hotwings" price={3.25} />
                <Counter title="3x Boneless" price={3.25} />
              </Card>
            </Bar>
            <Bar categories={[freeChoiceCategory]}>
              <Card>
                <Header>Saus</Header>
                <Counter title="Mayo" price={0.6} />
                <Counter title="Ketchup" price={0.6} />
                <Counter title="K-Fry" price={0.9} />
                <Counter title="Mexican" price={0.9} />
                <Counter title="Soy Garlic" price={0.9} />
                <Counter title="Honey Lemon" price={0.9} />
              </Card>
            </Bar>
            <Bar categories={[freeChoiceCategory]}>
              <Card>
                <Header>Koude Dranken</Header>
                <Counter title="Cola" price={2.5} />
                <Counter title="Fernandes rood" price={2.5} />
                <Counter title="Fernandes groen" price={2.5} />
                <Counter title="Fernandes blauw" price={2.5} />
                <Counter title="Redbul" price={3} />
                <Counter title="Oasis Rood" price={2.5} />
                <Counter title="Oasis Orange" price={2.5} />
              </Card>
            </Bar>
          </div>
        </div>
      </div>
      <div class="bg-slate-100 shadow-inner w-60">
        <Checkout />
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
    class="inline-flex w-full p-2 shadow cursor-pointer hover:text-blue-800 text-sm"
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

const Counter: Component<{ title: string; price: number }> = (props) => {
  function incrementCount(n: number) {
    const order = selectedOrder();
    if (order) {
      const model: CounterModel =
        order.counters[props.title] ||
        (order.counters[props.title] = {
          count: 0,
          unitPrice: props.price,
        });
      model.count += n;
      refreshItems();
    }
  }

  function getCount() {
    const x = items();
    const order = selectedOrder();
    if (!order) {
      return 0;
    } else {
      const model = order.counters[props.title];
      return model?.count || 0;
    }
  }

  const id = "_" + Math.random();
  return (
    <Label id={id}>
      <button class="flex-1 text-left" onClick={() => incrementCount(1)}>
        {props.title}
      </button>
      <span class="mx-2">
        <Show when={getCount() > 0}> ({getCount()})</Show>
      </span>
      <button
        onClick={() => incrementCount(-1)}
        classList={{
          hidden: getCount() == 0,
        }}
        class="text-red-400 w-6 h-5 rounded-md border-2 border-red-200 shadow-md hidden"
      >
        <BiSolidDownArrow class="m-auto text-xs" />
      </button>
    </Label>
  );
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

  for (const r of Object.values(order.counters)) {
    resultPrice += r.count * r.unitPrice;
  }

  return resultPrice;
}

const Checkout: Component = () => {
  type Sum = { amount: number; tax: number };
  function totalAmount(): Sum {
    var sum = items().reduce<Sum>(
      (p, c) => ({
        amount: p.amount + getOrderPrice(c),
        tax: 1,
      }),
      { amount: 0, tax: 0 }
    );

    return sum;
  }

  const [pin, setPin] = createSignal(0);
  const [cash, setCash] = createSignal(0);
  const [remaining, setRemaining] = createSignal(0);

  function updateCash(e: any) {
    setCash(parseInt(e.target.value || 0));
  }

  function updatePin(e: any) {
    setPin(parseInt(e.target.value || 0));
  }

  createEffect(() => {
    const sum = totalAmount();
    if (sum.amount == 0) {
      setPin(0);
      setCash(0);
    }
    setRemaining(sum.amount - pin() - cash());
  });

  async function checkout() {
    await fetch("/queue", {
      body: JSON.stringify(items()),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setItems([]);
    setSelectedOrder(undefined);
  }

  return (
    <>
      <div class="flex m-2">
        <button
          onclick={() => setItems((x) => [...x])}
          class="bg-blue-950 p-2 shadow-xl rounded px-4 text-white flex-1"
        >
          &euro; {totalAmount().amount.toFixed(2)}
        </button>
      </div>
      <div class="p-2">
        <span>Pin</span>
        <label class="mb-4 inline-flex flex-1 w-full h-8 border border-blue-400 ">
          <input
            type="number"
            placeholder="Pin"
            class="flex-1 p-2"
            value={pin() > 0 ? pin() : ""}
            onKeyUp={updatePin}
            onChange={updatePin}
          ></input>
        </label>
        <span>Cash</span>
        <label class="mb-4 inline-flex flex-1 w-full h-8 border border-blue-400 ">
          <input
            type="number"
            placeholder="Cash"
            class="flex-1 p-2"
            value={cash() > 0 ? cash() : ""}
            onKeyUp={updateCash}
            onChange={updateCash}
          ></input>
        </label>

        <span>Remaining</span>
        <label class="mb-4 inline-flex flex-1 w-full h-8 border border-blue-400 ">
          <input
            readOnly={true}
            type="number"
            placeholder="Remaining"
            class="flex-1 p-2 bg-slate-100"
            value={remaining()}
          ></input>
        </label>

        <div>
          <button
            class="border border-slate-300 p-4 rounded-lg bg-green-700 text-white flex-1 w-full"
            onClick={checkout}
          >
            Send to kitchen
          </button>
        </div>
      </div>
    </>
  );
};

function refreshItems() {
  setItems((x) => [...x]);
}

export default PosApp;
