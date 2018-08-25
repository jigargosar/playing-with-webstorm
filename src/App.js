import React, {Fragment} from "react";
import "tachyons";

function MainContent() {
  return (
    <div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
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
      <div className={"flex flex-column vh-100 overflow-hidden bg-black-30"}>
        <div className={"bg-black-30"}><HeaderContent/></div>
        <div className={"flex"}>
          <div className={'w-30 mw6 overflow-scroll '}><SidebarContent/></div>
          <div className={'flex-auto overflow-scroll bg-black-30'}><MainContent/></div>
        </div>
        <div className={'bg-black-30'}><FooterContent/></div>
      </div>
    </Fragment>
  );
}

export default App;
