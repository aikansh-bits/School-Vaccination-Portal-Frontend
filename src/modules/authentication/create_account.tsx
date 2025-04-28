import { useState } from "react";
import CustomTextInput from "../../components/custom_text_input";
import CustomButton from "../../components/custom_button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="p-[20px] flex flex-col gap-[20px]">
      <div className="flex flex-col mb-[20px]">
        <span className="font-semibold text-[14px]">Create a New Account</span>
        <span className="font-normal text-[12px]">
          Join the portal and start managing vaccination drives today!
        </span>
      </div>
      <CustomTextInput
        label="Full Name*"
        placeholder="Enter full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
      />
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
        text={"REGISTER"}
        isActive={true}
        onClick={() => {
          navigate("/dashboard");
        }}
      />
    </div>
  );
};
export default Register;
