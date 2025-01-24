import React from 'react'
import AddIcon from '../assets/AddIcon.svg'
import Icon from './Icon'
import AddIconDark from '../assets/AddIconDark.svg'
import style from './top.module.css'
import { useTheme } from "./ThemeProvider";

function top({text, onAddClick}) {
  const { theme } = useTheme();
  return (
    <>
      <div className={`${style.top} ${theme === 'dark' ? style.darkTheme : ''}`}>
        <span>{text}</span>
        <div className={style.addTodo}>
    {theme === 'light' ? (
        <Icon className={style.icon} src={AddIcon} onClick={onAddClick} />
    ) : (
        <Icon className={`${style.icon} ${style.AddIconDark}`} src={AddIconDark} onClick={onAddClick} />
    )}
    <p>Add new task</p>
    </div>
      </div>
    </>
  )
}

export default top