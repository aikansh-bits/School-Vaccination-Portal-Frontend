import React, { useState, useEffect } from "react";

type ButtonType = {
  text: string;
  onClick?: () => Promise<void> | void;
  isActive: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  isButtonLoading?: boolean;
  isHollow?: boolean;
  className?: string;
  prefixText?: React.ReactNode;
};

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonType>(
  (props, ref) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleVerification = async () => {
      if (props.onClick) {
        setIsButtonDisabled(true);
        try {
          await props.onClick();
        } catch (error) {
          console.error("Error occurred:", error);
        } finally {
          setIsButtonDisabled(false);
        }
      }
    };

    useEffect(() => {
      if (props.isButtonLoading) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }, [props.isButtonLoading]);

    const activeButtonClasses = props.isHollow
      ? "bg-white text-lightBlue border-lightBlue"
      : "bg-lightBlue text-black border-lightBlue"; // <-- solid button

    const disabledButtonClasses = "bg-disabledButton text-white cursor-not-allowed";

    return (
      <div>
        {props.isActive ? (
          <button
            ref={ref}
            className={`flex flex-row items-center justify-center gap-2 
            w-full text-[14px] font-semibold py-3 px-4 rounded-lg border
            ${isButtonDisabled ? disabledButtonClasses : activeButtonClasses} 
            ${props.className || ""}`}
            onClick={handleVerification}
            disabled={isButtonDisabled}
          >
            {props.prefixText && <div className="mr-2">{props.prefixText}</div>}
            {props.isButtonLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            ) : (
              <p>{props.text}</p>
            )}
          </button>
        ) : (
          <button
            ref={ref}
            className={`w-full text-[14px] font-semibold py-3 px-4 rounded-lg 
            ${disabledButtonClasses} 
            ${props.className || ""}`}
            disabled
          >
            <div className="flex flex-row items-center justify-center">
              {props.prefixText && <div className="mr-2">{props.prefixText}</div>}
              <p>{props.text}</p>
            </div>
          </button>
        )}
      </div>
    );
  }
);

export default CustomButton;
