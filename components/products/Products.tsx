import React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import type { Product } from "../../interfaces";
import { ProductListView } from "./ProductListView";
import { getCarts } from "../cart/hooks/useCart";

import productStyles from "../../styles/Product.module.css";

type PropType = {
  products: Array<Product>;
  handleCart: Function;
  isRestarant: boolean;
  isCheckout: boolean;
};

export const Products: React.FC<PropType> = (props) => {
  const router = useRouter();
  const { products, handleCart, isRestarant, isCheckout } = props;
  const carts = getCarts();

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box>
        {products.length &&
          products
            .filter((each, index) => {
              if (isCheckout) {
                return carts[each.id];
              } else return index < 3 || isRestarant;
            })
            .map((each, index) => (
              <Box
                key={index}
                sx={{
                  marginLeft: carts[each.id]
                    ? isCheckout
                      ? "-10px"
                      : "-15px"
                    : "0",
                  paddingLeft: carts[each.id]
                    ? isCheckout
                      ? "10px"
                      : "12px"
                    : "0",
                  borderLeft: carts[each.id] ? "3px solid #FF5C4D" : "0",
                }}
              >
                <ProductListView
                  index={index}
                  product={each}
                  inCart={carts[each.id]}
                  handleCart={handleCart}
                />
              </Box>
            ))}
      </Box>
      {!(isRestarant || isCheckout) && (
        <Box className={productStyles.showMoreButton}>
          <Button
            className={productStyles.showMore}
            variant="text"
            fullWidth
            onClick={() => router.push("/restarant_page")}
          >
            Show more
          </Button>
        </Box>
      )}
    </Box>
  );
};
