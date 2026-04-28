import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const RoleGuard = ({ roles, children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <Navigate to="/login" />;
  if (!roles.includes(currentUser.account_type)) return <Navigate to="/" />;
  return children;
};

export const useUserType = () => {
  const { currentUser } = useContext(AuthContext);
  return currentUser?.account_type ?? null;
};
