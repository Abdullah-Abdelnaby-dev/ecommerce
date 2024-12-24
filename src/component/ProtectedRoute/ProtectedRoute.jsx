import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { userContext } from "../../Context/User.Context";

export default function ProtectedRoute({children}) {
  let{token}=useContext(userContext)
  
if (token) {
  return children;
}else{
  console.log("Redirecting to login...");
  return <Navigate to="/login" />
}
  
}
