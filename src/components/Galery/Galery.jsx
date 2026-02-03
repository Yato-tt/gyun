import React from "react";

function Galery({children}) {
  return(
    <div className="my-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 w-full h-full">{children}</div>
  )
}

export default Galery
