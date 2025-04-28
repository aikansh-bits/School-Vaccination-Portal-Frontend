import { useState } from "react";
import Logo from "../assets/logo.PNG";

const LeftNavigationPanel = () => {
  const [selected, setSelected] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "home" },
    { name: "Students", icon: "school" },
    { name: "Vaccine Drives", icon: "vaccines" },
  ];

  const otherItems = [
    { name: "Profile", icon: "account_circle" },
    { name: "Logout", icon: "logout" },
  ];

  return (
    <div className="w-[18%] h-screen bg-white flex flex-col px-[20px] py-[20px] gap-[16px]">
      <img src={Logo} alt="" className="mb-[20px]" />

      <span className="text-[12px] text-graySoft">MENU</span>

      {menuItems.map((item) => (
        <div
          key={item.name}
          onClick={() => setSelected(item.name)}
          className={`flex flex-row items-center gap-[8px] px-[8px] rounded-[8px] h-[42px] cursor-pointer ${
            selected === item.name ? "bg-lightBlue" : ""
          }`}
        >
          <span
            className={`material-symbols-outlined ${
              selected === item.name ? "text-black" : "text-graySoft"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`text-[14px] font-medium ${
              selected === item.name ? "text-black" : "text-graySoft"
            }`}
          >
            {item.name}
          </span>
        </div>
      ))}

      <span className="text-[12px] text-graySoft mt-[20px]">OTHERS</span>
      {otherItems.map((item) => (
        <div
          key={item.name}
          onClick={() => setSelected(item.name)}
          className={`flex flex-row items-center gap-[8px] px-[8px] rounded-[8px] h-[42px] cursor-pointer ${
            selected === item.name ? "bg-lightBlue" : ""
          }`}
        >
          <span
            className={`material-symbols-outlined ${
              selected === item.name ? "text-black" : "text-graySoft"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`text-[14px] font-medium ${
              selected === item.name ? "text-black" : "text-graySoft"
            }`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeftNavigationPanel;
