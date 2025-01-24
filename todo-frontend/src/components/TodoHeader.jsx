//React and Components
import React from 'react'
import { useTheme } from "./ThemeProvider";

//style And Assets
import style from './TodoHeader.module.css'
import Icon from './Icon'
import SearchIcon from '../assets/SearchIcon.svg'
import BeLLIcon from '../assets/BeLLIcon.svg'
import CalenderIcon from '../assets/CalenderIcon.svg'
import Image from '../assets/Image.svg'

function TodoHeader() {
  const { theme } = useTheme();
  return (
    <div className={`${style['main-header']} ${theme === 'dark' ? style.darkTheme : ''}`} >

      <h1 className={style.greeting} >Welcome back, Vincent 👋</h1>

      <div className={style.right}>
        <Icon className={style.searchIcon} src={SearchIcon} />
        <Icon className={style.BeLLIcon} src={BeLLIcon} />
        <Icon className={style.CalenderIcon} src={CalenderIcon} />
        <p className={style.date} >19 May 2022</p>
        <Icon className={style.image} src={Image} />
      </div>
    </div>
  )
}

export default TodoHeader