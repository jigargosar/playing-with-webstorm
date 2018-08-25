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

function App() {
  return (
    <Fragment>
      <div className={"flex flex-column vh-100 overflow-hidden bg-black-30"}>
        <div className={"bg-black-30"}>fixed header</div>
        <div className={"flex"}>
          <div className={'w-30 mw6 overflow-scroll '}><SidebarContent /></div>
          <div className={'flex-auto overflow-scroll bg-black-30'}><MainContent /></div>
        </div>
        <div className={'bg-black-30'}>fixed footer</div>
      </div>
    </Fragment>
  );
}

export default App;
