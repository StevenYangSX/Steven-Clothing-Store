import Home from "./routes/home/Home.component";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
