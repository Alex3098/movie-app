import React from "react";
import style from "./Form.module.css";

export default function Form(props) {
  const [clac, setClac] = React.useState(0);
  const TableClac = () => {
    setClac(1);
    props.setSear(true);
  };
  return (
    <div>
      <div className={style.form_wrapper}>
        <form onSubmit={props.SearchMovie}>
          <input
            type="text"
            name="movieTitle"
            placeholder="Search movie"
            onChange={props.changeMovie}
          />

          <button
            onClick={TableClac}
            onAnimationEnd={() => setClac(0)}
            clac={clac}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
