import React from "react";

function Galery({children}) {
  return(
    <div className="my-12 p-4 w-full columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {children}
    </div>
  )
}

export default Galery
