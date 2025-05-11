import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.PNG";
import secureLocalStorage from "react-secure-storage";

const LeftNavigationPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: "home", path: "dashboard" },
    { name: "Students", icon: "school", path: "students" },
    { name: "Vaccine Drives", icon: "vaccines", path: "drives" },
    { name: "Generate Report", icon: "description", path: "generateReport" },
  ];

  const otherItems = [{ name: "Logout", icon: "logout" }];

  return (
    <div className="w-[18%] h-screen bg-white flex flex-col px-[20px] py-[20px] gap-[16px]">
      <img src={Logo} alt="App Logo" className="mb-[20px]" />

      <span className="text-[12px] text-graySoft">MENU</span>

      {menuItems.map((item) => {
        const isSelected = location.pathname.includes(item.path);
        return (
          <div
            key={item.name}
            onClick={() => navigate(`/${item.path}`)}
            className={`flex flex-row items-center gap-[8px] px-[8px] rounded-[8px] h-[42px] cursor-pointer ${
              isSelected ? "bg-lightBlue" : ""
            }`}>
            <span
              className={`material-symbols-outlined ${
                isSelected ? "text-black" : "text-graySoft"
              }`}>
              {item.icon}
            </span>
            <span
              className={`text-[14px] font-medium ${
                isSelected ? "text-black" : "text-graySoft"
              }`}>
              {item.name}
            </span>
          </div>
        );
      })}

      <span className="text-[12px] text-graySoft mt-[20px]">OTHERS</span>

      {otherItems.map((item) => (
        <div
          key={item.name}
          onClick={() => {
            if (item.name.toLowerCase() === "logout") {
              secureLocalStorage.clear();
              navigate("/login");
            }
          }}
          className={`flex flex-row items-center gap-[8px] px-[8px] rounded-[8px] h-[42px] cursor-pointer`}>
          <span className={`material-symbols-outlined text-graySoft`}>
            {item.icon}
          </span>
          <span className="text-[14px] font-medium text-graySoft">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeftNavigationPanel;
