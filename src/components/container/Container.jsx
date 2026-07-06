 
 import React from 'react'
// this component is used to create a container for the content of the page

function Container({children}) {
  // div element with full width and padding for the content of the page
  return  <div className="w-full px-4 sm:px-6 lg:px-8">{children}</div>;
  
}

export default Container