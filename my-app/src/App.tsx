
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import First from "./pages/First";
import Second from "./pages/Second";
import Third from "./pages/Third";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/first" element={<First />} />
      <Route path="/second" element={<Second />} />
      <Route path="/third" element={<Third />} />
    </Routes>
  );
}

export default App;
