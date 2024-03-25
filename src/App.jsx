import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CharacterCreator from "./pages/CharacterCreator.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/create-character" element={<CharacterCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
