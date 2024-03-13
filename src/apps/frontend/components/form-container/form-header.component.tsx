import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router";

interface FormHeaderProps {
  navigateBackwardURL?: string;
}

const FormHeader: React.FC<PropsWithChildren<FormHeaderProps>> = ({
  children,
  navigateBackwardURL,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {navigateBackwardURL
        && <button
          onClick={() => navigate(navigateBackwardURL)}
          className="mb-5 cursor-pointer text-lg transition active:text-primary/80"
        >
          Back
        </button>
      }
      <h2 className="text-2xl font-bold text-black sm:text-title-xl2">
        {children}
      </h2>
    </>
  );
}

export default FormHeader;
