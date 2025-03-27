import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecyclePage from "./pages/RecyclePage";
import Navbar from "./components/ui/Navbar";
import TransactionCompleted from "./pages/TransactionCompleted";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div className="p-6 w-full flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recycle" element={<RecyclePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/transaction-completed"
              element={<TransactionCompleted />}
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
