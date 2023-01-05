import React from "react";
import type { Product, Cart } from "../../interfaces";
import productStyles from "../../styles/Product.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { addCart, removeCart } from "../cart/hooks/useCart";
import Image from "next/image";

type PropType = {
  index: number;
  product: Product;
  inCart: Cart;
  handleCart: Function;
};

export const ProductCardView: React.FC<PropType> = (props) => {
  const { index, product, inCart, handleCart } = props;

  const addToCart = (product: Product) => {
    addCart(product);
    handleCart(window.localStorage.getItem("cart"));
  };

  const removeFromCart = (product: Product) => {
    removeCart(product.id);
    handleCart(window.localStorage.getItem("cart"));
  };

  return (
    <div className={productStyles.cardContainer} key={index}>
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
        {product.fields.img && product.fields.img.length && (
          <img
            className={productStyles.cardImg}
            src={product.fields.img[0].thumbnails.large.url}
            alt="Your alt text"
          />
        )}
        <div className={productStyles.cardInfo}>
          <div className={productStyles.cardTitle}>
            {product.fields.nomenclature_title}
          </div>
          <div className={productStyles.cardPrice}>
            ${product.fields.nomenclature_price}
          </div>
        </div>
      </Box>
      <div>
        {!inCart && (
          <Button
            className={productStyles.cardButton}
            variant="text"
            fullWidth
            onClick={() => addToCart(product)}
          >
            Add
          </Button>
        )}
        {inCart && (
          <Box
            className={productStyles.cardButton}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 16px !important",
            }}
          >
            <Image
              src="/minus.svg"
              alt=""
              width={11}
              height={15}
              priority
              onClick={() => removeFromCart(product)}
            />
            <Box sx={{ padding: "0 16px" }}>{inCart.count}</Box>
            <Image
              src="/plus.svg"
              alt=""
              width={11}
              height={15}
              priority
              onClick={() => addToCart(product)}
            />
          </Box>
        )}
      </div>
    </div>
  );
};
