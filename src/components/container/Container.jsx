 
 import React from 'react'
// this component is used to create a container for the content of the page

function Container({children}) {
  // div element with max width and padding for the content of the page
  return  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
  
}

export default Container