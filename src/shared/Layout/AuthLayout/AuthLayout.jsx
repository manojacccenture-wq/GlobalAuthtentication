import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid place-items-center ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
