import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../lib/firebase"; // adjust path if needed
import { Loader } from "lucide-react";

const PrivateRouter = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin h-6 w-6 text-emerald-600" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
