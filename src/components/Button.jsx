 import React from 'react'
// this component is used to create a button with different styles and types

function Button( {
   // children is the content of the button, type is the type of the button, bgColor is the background color of the button, textColor is the text color of the button, className is the additional class name for the button, props are the other props for the button
    children,
    type ='button',
    bgColor = 'bg-color=',
    textColor = 'white',
    className = '',
    ...props
}) {
  return (
   // button element with different styles and types
     <button type={type} className= { `px-4 py-2 rounded-lg  ${textColor} ${bgColor} ${className}`} {...props}>
        {children}
   


     </button>
  )
}


export default Button