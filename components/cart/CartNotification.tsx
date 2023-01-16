import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import cartStyles from "../../styles/Cart.module.css";
import Button from "@mui/material/Button";
import { getCarts } from "../cart/hooks/useCart";
import type { Product } from "../../interfaces";

type PropType = {
  products: Array<Product>;
};

export const CartNotification: React.FC<PropType> = (props) => {
  const carts = getCarts();
  const { products } = props;
  const router = useRouter();
  const cartItems = Object.keys(carts).filter(
    (key) => key !== "totalItems" && key !== "totalPrice"
  );
  console.log(products);
  return (
    <Box className={cartStyles.cartNotification}>
      {products && (
        <Box>
          <Box className={cartStyles.cartInfo}>
            <Box component="span" sx={{ fontWeight: "700" }}>
              Cart
            </Box>{" "}
            ({carts.totalItems} {carts.totalItems == 1 ? "item" : "items"}) • $
            {carts.totalPrice}
          </Box>
          <Box sx={{ display: "flex" }}>
            {Object.keys(carts)
              .filter((key) => key !== "totalItems" && key !== "totalPrice")
              .map((key, index) => {
                const product = products.find(
                  (eachProduct) => eachProduct.id == key
                );
                return index < 5 ? (
                  <Box key={index} className={cartStyles.cartImageBody}>
                    {product &&
                      product.fields.img &&
                      product.fields.img.length && (
                        <img
                          className={cartStyles.cartNotiImage}
                          src={product.fields.img[0].thumbnails.large.url}
                          alt="Your alt text"
                        />
                      )}
                  </Box>
                ) : (
                  ""
                );
              })}
            {cartItems.length > 5 && (
              <Box className={cartStyles.cartItemCountBody}>
                <Box className={cartStyles.cartItemCount}>
                  +{cartItems.length - 5}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box>
        <Button
          className={cartStyles.showMore}
          variant="text"
          fullWidth
          onClick={() => router.push("/checkout")}
        >
          Prossed to checkout
        </Button>
      </Box>
    </Box>
  );
};
