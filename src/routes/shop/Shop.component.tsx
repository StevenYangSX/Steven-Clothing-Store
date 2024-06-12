import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import ProductCard from "../../components/product-card/ProductCard.component";
import "./shop.styles.scss";
import CategoryPreview from "../../components/category-preview/CategoryPreview.component";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/CategoriesPreview.component";
import Category from "../../components/category/Category.component";
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
