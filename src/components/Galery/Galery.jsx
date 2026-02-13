import React from "react";
import Masonry from 'react-masonry-css';
import './Galery.css';

function Galery({children}) {
  const breakpointColumns = {
    default: 7,
    1536: 7,
    1280: 6,
    1024: 5,
    768: 4,
    640: 3,
    0: 2
  };

  return(
    <div className="my-12 px-4 w-full max-w-[1800px] mx-auto">
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {children}
      </Masonry>
    </div>
  )
}

export default Galery
