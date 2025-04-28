

import { Outlet } from "react-router-dom";
import LeftNavigationPanel from "../components/LeftNavigationPanel";

const Layout = () => {
  return (
    <div className="flex">
      <LeftNavigationPanel />
      <div className="flex-1 bg-lightGray">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
