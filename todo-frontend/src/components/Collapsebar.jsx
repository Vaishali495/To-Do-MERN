// React and  Components
import React from "react";
import Icon from "./Icon";
import Dropdown from "./Dropdown";
import { useTheme } from "./ThemeProvider";

//Style and Assets
import style from "../components/Collapsebar.module.css";
import AddIcon from "../assets/AddIcon.svg";
import LightIcon from "../assets/LightIcon.svg";
import DarkIcon from "../assets/DarkIcon.svg";

const CollapseBar = () => {
   // Access theme context for dark/light mode toggle
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className={style.collapseBar}>
        <div className={style.headDiv}>
          <h1 className={style.heading}>Projects</h1>
          <Icon className={style.AddIcon} src={AddIcon} />
        </div> 

        {/* Project navigation dropdown */}
        <Dropdown />
      
      <div className={`${style.LightDarkButton}
        ${theme === 'dark' ? style.darkTheme : style.lightTheme}
      `}>
        <button
          onClick={() => toggleTheme("light")}
          className={`${style.LightButton} ${
            theme === "light" ? style.activeLightButton : style.darkTheme4lightbtn
          }`}
        >
            <div className={style.flex} >
                <Icon src={LightIcon} />
                <span>Light</span>
            </div>
        </button>

        <button
          onClick={() => toggleTheme("dark")}
          className={`${style.DarkButton} ${
            theme === "dark" ? style.activeDarkButton : style.inactiveDarkButton
          }`}
        >
            <div className={style.flex} >
                <Icon src={DarkIcon} />
                <span>Dark</span>
            </div>
        </button>
      </div>
      </div>
    </>
  );
};

export default CollapseBar;