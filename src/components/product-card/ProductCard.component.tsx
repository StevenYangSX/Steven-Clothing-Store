import React, { useContext } from "react";
import "./product-cart.styles.scss";
import Button from "../button/Button.component";
import { ProductType } from "../../types/systemTypes";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => {
    console.log("butrton clicke....", product);
    addItemToCart(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
