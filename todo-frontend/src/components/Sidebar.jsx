//React and Hooks
import React, { useState } from "react";

//Components
import CollapseBar from "./collapseBar";
import Icon from "./Icon";

//Style and Theme
import style from "../components/Sidebar.module.css";
import { useTheme } from "./ThemeProvider";

//Asset imports for icon
import ovals from "../assets/Ovals.svg";
import logo from "../assets/Logo.svg";
import icon1 from "../assets/Icon1.svg";
import icon2 from "../assets/Icon2.svg";
import icon3 from "../assets/Icon3.svg";
import icon4 from "../assets/Icon4.svg";
import icon5 from "../assets/Icon5.svg";
import icon6 from "../assets/Icon6.svg";
import icon7 from "../assets/Icon7.svg";
import iconEnd from "../assets/IconEnd.svg";

function Sidebar() {
  const { theme } = useTheme();
  const [isCollapseBarVisible, setIsCollapseBarVisible] = useState(false);

  const handleLogoClick = () => {
    console.log("am in handleLogoClick");
    setIsCollapseBarVisible(!isCollapseBarVisible);
  };

  return (
    <>
      <div className={style.sidebar}>
        <Icon className={style.ovals} src={ovals} />
        <Icon className={style.logo} src={logo} onClick={handleLogoClick} />

        <div className={style.items}>
          <div className={style.box}>
            <Icon className={style.icon1} src={icon1} />
          </div>
          <Icon className={style.icon2} src={icon2} />
          <Icon className={style.icon3} src={icon3} />
          <Icon className={style.icon4} src={icon4} />
          <Icon className={style.icon5} src={icon5} />
          <Icon className={style.icon6} src={icon6} />
          <Icon className={style.icon7} src={icon7} />
        </div>
        <Icon className={style.iconEnd} src={iconEnd} />
      </div>

      {/* {isCollapseBarVisible && <CollapseBar />} */}
      <div
        className={`${style.collapseContainer} 
        ${ isCollapseBarVisible ? style.show : style.hide}
        ${theme === 'dark' ? style.darkTheme : ''}`}
      >
        <CollapseBar />
      </div>
    </>
  );
}

export default Sidebar;
