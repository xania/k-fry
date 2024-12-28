import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";
import {
  americanStyle,
  bonelessCategory,
  bowlsCategory,
  burgerCategory,
  CategoryModel,
  colaPrice,
  frietPrice,
  hotwingsCategory as hotwingsCategory,
  koreanStyle,
  koudeDranken,
  drankDiscount,
  sauses,
  snacks,
  frietDiscount,
} from "./models/product";

const App: Component<RouteSectionProps<unknown>> = (props) => {
  return (
    <>
      <div class="flex p-4">
        <div class="ml-auto">
          <a class="m-2 p-2 block bg-blue-950 text-white" href="/pos">
            Point of Sale
          </a>
        </div>
        <div class="mr-auto">
          <a class="m-2 p-2 block bg-green-950  text-white" href="/kitchen">
            Kitchen
          </a>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex gap-4 border  m-auto">
          <div class="border border-black p-2 shadow-md">
            <MenuScherm
              {...burgerCategory}
              menuDiscount={drankDiscount + frietDiscount}
            />
          </div>
          <div class="border border-black p-2 shadow-md">
            <MenuScherm
              {...bonelessCategory}
              menuDiscount={drankDiscount + frietDiscount}
            />
          </div>
          <div class="border border-black p-2 shadow-md">
            <MenuScherm
              {...hotwingsCategory}
              menuDiscount={drankDiscount + frietDiscount}
            />
          </div>
          <div class="border border-black p-2 shadow-md">
            <MenuScherm
              {...bowlsCategory}
              menuDiscount={drankDiscount + frietPrice}
            />
          </div>
        </div>
        <div class="flex gap-4 border  m-auto">
          <div class="border border-black p-2 shadow-md">
            <KoudeDrinkenScherm />
          </div>
          <div class="border border-black p-2 shadow-md">
            <SnacksScherm />
          </div>
          <div class="border border-black p-2 shadow-md">
            <SausScherm />
          </div>
        </div>
      </div>
    </>
  );
};

function Item(props: { title: string; price: number }) {
  return (
    <div>
      {props.title} {props.price}
    </div>
  );
}

function KoudeDrinkenScherm() {
  return (
    <>
      <h1 class="text-slate-800 font-bold">Koude drinken</h1>
      <div>
        {koudeDranken.map((item) => (
          <Item {...item} />
        ))}
      </div>
    </>
  );
}
function SnacksScherm() {
  return (
    <>
      <h1 class="text-slate-800 font-bold">Snacks</h1>
      <div>
        {snacks.map((item) => (
          <Item {...item} />
        ))}
      </div>
    </>
  );
}
function SausScherm() {
  return (
    <>
      <h1 class="text-slate-800 font-bold">Saus</h1>
      <div>
        {sauses.map((item) => (
          <Item {...item} />
        ))}
      </div>
    </>
  );
}

function MenuScherm(props: CategoryModel & { menuDiscount: number }) {
  const losPrice = props.price;
  const styles = [...americanStyle, ...koreanStyle];
  return (
    <>
      <h1 class="text-slate-800 font-bold">{props.name}</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Los</td>
            <td>Menu</td>
          </tr>
        </thead>
        {styles.map((item) => (
          <tr>
            <td>{item.title}</td>
            <td>{losPrice + item.price}</td>
            <td>
              {(
                losPrice +
                item.price +
                frietPrice +
                colaPrice -
                props.menuDiscount
              ).toFixed(2)}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
function Scherm4() {
  return (
    <>
      <h1>scherm 1</h1>
      <div>1</div>
    </>
  );
}

export default App;
