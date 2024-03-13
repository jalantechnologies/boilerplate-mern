import React, { PropsWithChildren } from "react";

const FormBody: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      {children}
    </>
  );
}

export default FormBody;
