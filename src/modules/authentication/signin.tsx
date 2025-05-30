import { useState } from "react";
import CustomTextInput from "../../components/custom_text_input";
import CustomButton from "../../components/custom_button";
import { useNavigate } from "react-router-dom";
import { SignInPayload } from "../../services/models/authentication/signin";
import { authenticationApis } from "../../services/apis/authentication_apis";
import secureLocalStorage from "react-secure-storage";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setIsButtonLoading(true);
      const signInPayload: SignInPayload = {
        email: email,
        password: password,
      };
      const response = await authenticationApis.signIn(signInPayload);
      if (response.status.toLowerCase() === "success") {
        secureLocalStorage.setItem("userId", response.data.userId);
        secureLocalStorage.setItem("id", response.data._id);
        secureLocalStorage.setItem("fullName", response.data.name);
        secureLocalStorage.setItem("email", response.data.email);
        navigate("/dashboard");
      }
      setIsButtonLoading(false);
    } catch (error: any) {
      setIsButtonLoading(false);
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setError(errorMessage);
    }
  };

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

      {error !== "" && (
        <div className="flex flex-row items-center gap-[4px]">
          <span className="material-symbols-outlined text-red-600">
            warning
          </span>
          <span className="text-[12px] text-red-600">{error}</span>
        </div>
      )}

      <div className="mb-[20px]" />
      <CustomButton
        text={"SIGN IN"}
        isActive={true}
        onClick={handleSubmit}
        isButtonLoading={isButtonLoading}
      />
    </div>
  );
};
export default SignIn;
