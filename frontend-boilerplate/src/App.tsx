import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp.tsx';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<div className="p-8 text-center">404 - Page not found</div>} />
        </Routes>
      </Router>
  );
}