import React from "react";

import bgGif from "../../assets/imgs/background.gif"

function Header() {

  return (
    <div className="flex justify-center h-36 m-3">
      <div className="h-full rounded-2xl overflow-hidden">
        <img src={bgGif} alt="banner" />
      </div>
        <img className="absolute top-24 left-1/2.5 h-24 rounded-full" src="https://avatars.githubusercontent.com/u/61639385?v=4" alt="Yato-tt" />
    </div>
  )
}

export default Header
