import React, {Fragment} from "react";
import "tachyons";

function RepeatString({value="default string", times=30}) {
  return (
    <div>
      {new Array(times).fill(value).map((s,i)=><div key={i}>{s}</div>)}
    </div>
  );
}

function SidebarContent() {
  return (
    <div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
      <div>sidebar</div>
    </div>
  );
}

function HeaderContent() {
  return <div className={"f2 ma2"}>fixed header</div>;
}

function FooterContent() {
  return <div className={"pa2 f4"}>fixed footer</div>;
}

function App() {
  return (
    <Fragment>
      <div className={"flex flex-column vh-100 overflow-hidden bg-black-20"}>
        <div className={"bg-black-20 ba bw1 b--blue"}>
          <HeaderContent />
        </div>
        <div className={"flex-auto flex "}>
          <div className={"w-30 mw6 overflow-scroll bg-black-40 ba bw1 b--pink"}>
            <RepeatString value={"side bar item"} times={3}/>
          </div>
          <div className={"flex-auto overflow-scroll bg-black-50 ba bw1 b--green"}>
            <RepeatString value={"main content items"} times={3}/>
          </div>
        </div>
        <div className={"bg-black-20 ba bw1 b--red"}>
          <FooterContent />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
