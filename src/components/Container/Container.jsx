import React from "react";

function Container({title, children}) {
  return(
    <div className="fixed inset-0 flex flex-col items-center text-center justify-center bg-cyan-950/25">
      <div className="bg-cyan-50 border-gray-200 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container
