import { useState } from "react";
import CustomTextInput from "../../components/custom_text_input";
import CustomButton from "../../components/custom_button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="p-[20px] flex flex-col gap-[20px]">
      <div className="flex flex-col mb-[20px]">
        <span className="font-semibold text-[14px]">
          Sign in to continue to the Vaccination Portal
        </span>
        <span className="font-normal text-[12px]">
          Manage students, drives, and vaccination records easily.
        </span>
      </div>

      <CustomTextInput
        label="Email*"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <CustomTextInput
        label="Password*"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <div className="mb-[20px]" />
      <CustomButton
        text={"SIGN IN"}
        isActive={true}
        onClick={() => {
          navigate("/dashboard");
        }}
      />
    </div>
  );
};
export default SignIn;
