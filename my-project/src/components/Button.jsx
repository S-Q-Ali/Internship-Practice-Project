import React from 'react'

function Button({children,handleclick, styles}) {
  return (
    <button className={styles} onClick={handleclick} style={{color:"white"}}>{children}</button>
  )
}

export default Button