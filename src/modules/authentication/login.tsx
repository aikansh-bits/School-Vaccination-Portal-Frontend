import TabSwitcher from "../../components/tab_switcher";
import SignIn from "./signin";
import SignUp from "./signup";
import Logo from "../../assets/logo.PNG";
import Lottie from "lottie-react";
import HandLottie from "../../assets/hand.json";

const LoginPage = () => {
  const tabs = [
    {
      label: "Sign In",
      component: <SignIn />,
    },
    {
      label: "Sign Up",
      component: <SignUp />,
    },
  ];

  return (
    <div className="flex flex-row h-screen">
      <div className="w-[65%] bg-lightPurple p-[20px] flex flex-col items-start">
        <img src={Logo} alt="" className="mb-[20px] w-[25%]" />
        <div className="relative w-full h-full flex flex-col justify-end">
          <Lottie
            animationData={HandLottie}
            loop={true}
            className="absolute bottom-[-100px] right-[-220px] w-[90%]"
          />
        </div>
      </div>
      <div className="flex flex-col w-[35%] p-[20px]  pt-[80px]">
        <TabSwitcher tabs={tabs} />
      </div>
    </div>
  );
};
export default LoginPage;
