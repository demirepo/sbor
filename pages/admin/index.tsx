import React from "react";
import Hotels from "./../../components/Hotels";

export default function Admin() {
  return (
    <>
      <div className="inner">
        <div className="container">
          <Hotels />
        </div>
      </div>

      <style jsx>{`
        .inner {
          padding-top: 10%;
        }
      `}</style>
    </>
  );
}
