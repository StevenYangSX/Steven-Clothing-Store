import Home from "./routes/home/Home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.component";
import Signin from "./routes/signin/Signin.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Home />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>
  );
};

export default App;
