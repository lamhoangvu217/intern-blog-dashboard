/* eslint-disable react/prop-types */

import Sidebar from "../Sidebar/Sidebar";

function WrapperComponent({ children }) {
  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">{children}</div>
    </div>
  );
}

export default WrapperComponent;
