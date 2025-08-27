import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import DetailPage from "@/pages/DetailPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:row_id/" element={<DetailPage />} />
        <Route path="/search/:title/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
