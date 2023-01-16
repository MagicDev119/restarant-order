import React from "react";
import type { Product, Cart } from "../../interfaces";
import productStyles from "../../styles/Product.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import { addCart, removeCart } from "../cart/hooks/useCart";

type PropType = {
  index: number;
  product: Product;
  inCart: Cart;
  handleCart: Function;
};

export const ProductListView: React.FC<PropType> = (props) => {
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
    <Box className={productStyles.listContainer} key={index}>
      <Box sx={{ display: "flex", flex: 1 }}>
        {product.fields.img && product.fields.img.length && (
          <img
            className={productStyles.listImg}
            src={product.fields.img[0].thumbnails.large.url}
            alt="Your alt text"
          />
        )}
        <div className={productStyles.listInfo}>
          <div className={productStyles.listTitle}>
            {product.fields.nomenclature_title}
          </div>
          <div className={productStyles.cardPrice}>
            ${product.fields.nomenclature_price}
          </div>
        </div>
      </Box>
      <Box sx={{ width: "115px", display: "flex", justifyContent: "end" }}>
        {!inCart && (
          <Button
            className={productStyles.listButton}
            variant="text"
            fullWidth
            onClick={() => addToCart(product)}
            sx={{ width: "fit-content" }}
          >
            Add
          </Button>
        )}
        {inCart && (
          <Box
            className={productStyles.listButton}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "12.6px 16px !important",
              width: "fit-content",
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
      </Box>
    </Box>
  );
};
