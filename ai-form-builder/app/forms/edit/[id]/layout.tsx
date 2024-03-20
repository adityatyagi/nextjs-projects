import React, { PropsWithChildren } from "react";

type Props = {};

const EditLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6">
      {children}
    </div>
  );
};

export default EditLayout;
