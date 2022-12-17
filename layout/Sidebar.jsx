import React from "react";
import styles from "../styles/components/Sidebar.module.scss";
import classnames from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import DatepickerRu from "./../components/DatepickerRu";

export default function Sidebar() {
  return (
    <aside className="center">
      <div className={classnames(styles.sidebar__inner, "box", "stack")}>
        <h2 className={"tac"}>Содержание</h2>
        <DatepickerRu />
      </div>
    </aside>
  );
}
