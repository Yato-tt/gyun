import React from "react";

function Galery({children}) {
  return(
    <div className="my-12 px-4 w-full max-w-[1800px] mx-auto columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2 md:gap-3 lg:gap-4">
      {children}
    </div>
  )
}

export default Galery
