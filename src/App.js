import React, {Fragment} from "react";
import "tachyons";

function RepeatString({ value = "default string", times = 30 }) {
  return (
    <div>
      {new Array(times).fill(value).map((s, i) => <div key={i}>{s}</div>)}
    </div>
  );
}
function HeaderContent() {
  return <div className={"f2 ma2"}>fixed header</div>;
}

function FooterContent() {
  return <div className={"pa2 f4"}>fixed footer</div>;
}

function DrawerLayout({ children, header, footer, sidebar }) {
  return (
    <Fragment>
      <div className={"flex flex-column vh-100 overflow-hidden bg-black-20"}>
        <div className={"bg-black-20 ba bw1 b--blue"}>{header}</div>
        <div className={"flex-auto flex "}>
          {sidebar && <div
            className={"w-30 mw6 overflow-scroll bg-black-40 ba bw1 b--pink"}
          >
            {sidebar}
          </div>}
          <div
            className={"flex-auto overflow-scroll bg-black-50 ba bw1 b--green"}
          >
            {children}
          </div>
        </div>
        <div className={"bg-black-20 ba bw1 b--red"}>{footer}</div>
      </div>
    </Fragment>
  );
}

function App() {
  return (
    <DrawerLayout
    // header={<HeaderContent />}
    // footer={<FooterContent />}
    // sidebar={<RepeatString value={"side bar item"} times={3} />}
    >
      <RepeatString value={"main content items"} times={3} />
    </DrawerLayout>
  );
}

export default App;
