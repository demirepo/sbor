import React from "react";
import Hotels from "./../../components/Hotels";
import WithSidebar from "./../../layout/WithSidebar";
import Sidebar from "./../../layout/Sidebar";

export default function Admin() {
  return (
    <>
      <WithSidebar sidebar={<Sidebar />} />
    </>
  );
}
