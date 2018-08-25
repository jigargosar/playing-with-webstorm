import React from "react";
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
    <div className={'vh-100 overflow-hidden'}>
      <div className={"flex h-100 flex-column overflow-scroll bg-black-30"}>
        <div className={"bg-black-30"}>fixed header</div>
        <div className={"flex overflow-scroll"}>
          <div className={'overflow-scroll bg-black-30'}><SidebarContent /></div>
          <div className={'overflow-scroll'}><MainContent /></div>
        </div>
        <div className={'bg-black-30'}>fixed footer</div>
      </div>
    </div>
  );
}

export default App;
