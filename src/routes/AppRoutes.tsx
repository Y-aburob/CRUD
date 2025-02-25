import { Routes, Route } from "react-router-dom";
import { AxiosCRUD, Home, QueryCRUD } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/axios" element={<AxiosCRUD />} />
      <Route path="/query" element={<QueryCRUD />} />
    </Routes>
  );
};

export default AppRoutes;
