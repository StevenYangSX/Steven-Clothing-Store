import { useContext, Fragment, useEffect } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import ProductCard from "../../components/product-card/ProductCard.component";
import "./shop.styles.scss";
import { UseDispatch, useDispatch } from "react-redux";
import CategoryPreview from "../../components/category-preview/CategoryPreview.component";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/CategoriesPreview.component";
import Category from "../../components/category/Category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { setCategories } from "../../store/catetories/categoryAction";
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      console.log("categoriesArray =>", categoriesArray);
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
