import React from "react";
import style from "./Header.module.css";
import logo from "../../img/logo.svg";
import Form from "../Form/Form";

export default function Header(props) {
  return (
    <div className={style.header_wrapper}>
      <div className={style.logo}>
        <img src={logo} alt="Movies" />
      </div>
      <div className={style.search_form}>
        <Form SearchMovie={props.SearchMovie} setSear={props.setSear} />
      </div>
    </div>
  );
}
