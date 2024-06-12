import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext";
import ProductCard from "../product-card/ProductCard.component";
import "./category.sytles.scss";
const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext<any>(CategoriesContext);
  const [products, setProducts] = useState([]);

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
