import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../product-card/ProductCard.component";
import "./category.sytles.scss";
import { selectCategoriesMap } from "../../store/catetories/categorySelector";
import { useSelector } from "react-redux";
const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const categoriesMap = useSelector(selectCategoriesMap);

  useEffect(() => {
    setProducts(categoriesMap[category ? category : ""]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product: any) => <ProductCard key={product.id} product={product} />)}
      </div>
    </Fragment>
  );
};

export default Category;
