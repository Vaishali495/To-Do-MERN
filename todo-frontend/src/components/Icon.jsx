import React from 'react'

function Icon({className, src, onClick}) {
  return (
    <img className={className} src={src} onClick={onClick} alt="Icon" />
  )
}

export default Icon