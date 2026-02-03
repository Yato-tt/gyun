import React from "react";

function Container({title, children}) {
  return(
    <div className="fixed inset-0 flex flex-col items-center text-center justify-center bg-cyan-950/25">
      <div className="bg-cyan-50 border-gray-200 rounded-2xl p-4">
        <h1>{title}</h1>
        <div className="grid grid-cols-4 justify-items-center gap-2 uppercase accent-pink-400">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container
