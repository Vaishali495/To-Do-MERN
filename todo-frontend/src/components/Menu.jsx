//React and Components 
import React from "react";
import { useTheme } from "./ThemeProvider";

//style and Assets
import style from "./Menu.module.css";
import Icon from "./Icon";
import BoardIcon from "../assets/BoardIcon.svg";
import AddIcon from "../assets/AddIcon.svg";
import ThreeDotIcon from "../assets/threeDotIcon.svg";
import Circle from "../assets/circle.svg";

function Menu() {
  const { theme } = useTheme();
  return (
    <>
    <div className={`${style["menu-Div1"]} ${theme === 'dark' ? style['menu-div1-dark'] : ''}`}>
        <div className={`${theme === 'dark' ? style.darkBorder : style.BoardView}`}>
          <Icon className={style.BoardIcon} src={BoardIcon} />
          <p className={style.BoardContent}>Board view</p>
        </div>
        <div className={`${theme === 'dark' ? style.darkAddView : style.AddView}`}>
          <Icon className={style.AddIcon} src={AddIcon} />
          <p className={style.AddContent}>Add view</p>
        </div>
      </div>

      <div className={`${style["menu-Div2"]} ${theme === 'dark' ? style['menu-div2-dark'] : ''}`}>
        <span className={style.filter}>Filter</span>
        <span className={style.sort}>Sort</span>
        <div className={style["circle-container"]}>
          <Icon className={style.circle} src={Circle} />
          <Icon className={style.threeDotIcon} src={ThreeDotIcon} />
        </div>
          <button className={style.content} >New template</button>
      </div>
    </>
  );
}

export default Menu;
