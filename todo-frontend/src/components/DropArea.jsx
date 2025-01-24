import React,{useState} from 'react'
import style from './DropArea.module.css'

function DropArea({onDrop}) {
    const [showDrop, setShowDrop] = useState(false);
  return (
    <section 
    onDragEnter={() => setShowDrop(true)} 
    onDragLeave={() => setShowDrop(false)} 
    onDrop={() => {
      onDrop();
      setShowDrop(false);
    }}
    onDragOver={e => e.preventDefault()}
    className={showDrop ? style['drop-area'] : style['hide-drop-area']} >Drop Here</section>
  )
}

export default DropArea