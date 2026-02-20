import React from "react";

function Container({ title, children }) {
  return (
    <div className="bg-cyan-50 border border-gray-200 rounded-2xl shadow-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {title}
      </h2>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

export default Container;
