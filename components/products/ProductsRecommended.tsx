import React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import useSwr from "swr";
import type { Product } from "../../interfaces";
import { ProductCardView } from "./ProductCardView";
import Box from "@mui/material/Box";
import productStyles from "../../styles/Product.module.css";
import { getCarts } from "../cart/hooks/useCart";

type PropType = {
  products: Array<Product>;
  handleCart: Function;
};

export const ProductsRecommended: React.FC<PropType> = (props) => {
  const { products, handleCart } = props;
  const carts = getCarts();

  const options: EmblaOptionsType = {
    dragFree: true,
    containScroll: "trimSnaps",
  };
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <Box>
      <Box
        className={productStyles.textStyle}
        sx={{ padding: "20px 0 10px 0" }}
      >
        Recommended
      </Box>
      <div className="embla">
        {products.length && (
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {products.map((each, index) => (
                <ProductCardView
                  key={index}
                  index={index}
                  product={each}
                  inCart={carts[each.id]}
                  handleCart={handleCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};
