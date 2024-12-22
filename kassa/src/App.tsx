import { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";

const App: Component<RouteSectionProps<unknown>> = (props) => {
  return (
    <>
      <div>
        <a href="/pos">Point of Sale</a>
      </div>
      <div>
        <a href="/kitchen">Kitchen</a>
      </div>
    </>
  );
};

export default App;
