import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../../auth/authThunk";


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(logoutAsync()).unwrap();
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        navigate("/", { replace: true });
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return null; // nothing to render
};

export default Logout;