import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ErrorBoundary from "./components/ErrorBoundary";
import Signup from "./pages/Signup";
import { useAuth } from "./context/useAuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      
        <div className="mx-auto">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </>
            )}
          </Routes>
        </div>
    </ErrorBoundary>
  );
}

export default App;
