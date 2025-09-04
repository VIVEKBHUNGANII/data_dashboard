import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import PrivateRoute  from "./auth/PrivateRoute";  
import { SignIn, SignUp } from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={ <PrivateRoute>
        <Dashboard />
        </PrivateRoute>} />
      {/* <Route path="/auth/*" element={<Auth />} /> */}
      <Route path="/auth/sign-in" element={<SignIn/>}/>
      <Route path="/auth/sign-up" element={<SignUp/>}/>
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
