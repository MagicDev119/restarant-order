import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useSwr from "swr";
import { Layout } from "../components/layout/Layout";
import { Products } from "../components/products/Products";
import productStyles from "../styles/Product.module.css";
import cartStyles from "../styles/Cart.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import type { Product } from "../interfaces";
import { getCarts } from "../components/cart/hooks/useCart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const cardStyle = {
  style: {
    base: {
      color: "#000",
      fontFamily: '"Defined Inter", "Inter"',
      fontSmoothing: "antialiased",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "10px",
      lineHeight: "13px",
      "::placeholder": {
        color: "#000",
      },
    },
    invalid: {
      fontFamily: '"Defined Inter", "Inter"',
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function Checkout() {
  const { data, error } = useSwr<Product[]>("/api/products", fetcher);
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [cart, setCart] = useState([]);
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const productList = data && data.length ? data : [];
  const handleCart = (value: any) => {
    setCart(value);
  };
  const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

  const [carts, setCarts] = useState({ totalPrice: 0 });

  useEffect(() => {
    setCarts(getCarts());
  }, [cart]);

  const handleCheckout = async () => {
    let placeIds: Array<string> = [];
    Object.keys(carts).map((key) => {
      const product = productList.find((eachProduct) => {
        return eachProduct.id == key;
      });
      if (product) placeIds = placeIds.concat(product.fields.places);
    });
    // await fetch(`/api/cart`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     fields: {
    //       room: roomId + "",
    //       place_id: placeIds.filter((c, index) => {
    //         return placeIds.indexOf(c) === index;
    //       }),
    //       payment_status:
    //         selectedPayment !== "cash" ? "payed" : "pending_payment",
    //       payment_method:
    //         selectedPayment == "pay"
    //           ? "apple pay"
    //           : selectedPayment == "credit"
    //           ? "creditcard"
    //           : "cash",
    //       total_amount: carts.totalPrice,
    //       order_status: "new",
    //       order_items: [],
    //     },
    //     carts: carts,
    //   }),
    // });
    console.log(roomId);
    router.push({
      pathname: "/success_order",
      query: { room: roomId },
    });
  };
  return (
    <Box className={productStyles.checkoutPage}>
      <Layout>
        <Box className={productStyles.content}>
          <Box className={productStyles.itemCount}>
            Cart{" "}
            <Box component="span" sx={{ fontWeight: "500" }}>
              (
              {
                Object.keys(carts).filter(
                  (key) => key !== "totalItems" && key !== "totalPrice"
                ).length
              }{" "}
              items)
            </Box>
          </Box>
          <Box sx={{ width: "100%", marginTop: "-10px" }}>
            <Products
              products={productList}
              handleCart={handleCart}
              isRestarant={true}
              isCheckout={true}
            />
          </Box>
          <Box
            className={productStyles.itemCount}
            sx={{ padding: "0 0 15px 0 !important" }}
          >
            <Box component="span" sx={{ fontWeight: "500" }}>
              Total:&nbsp;
            </Box>
            ${carts.totalPrice}
          </Box>
          <Box
            className={productStyles.itemCount}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Box>Need anything else?</Box>
              <Box
                className={productStyles.addMoreText}
                sx={{ lineHeight: "15px !important", color: "#000 !important" }}
              >
                Add other fishes, if you want
              </Box>
            </Box>
            <Box>
              <Button
                className={
                  productStyles.addMoreText + " " + productStyles.addMore
                }
                variant="text"
                fullWidth
              >
                Add more
              </Button>
            </Box>
          </Box>
          <Box
            className={productStyles.itemCount}
            sx={{ paddingTop: "25px !important" }}
          >
            Your Room
          </Box>
          <Box>
            <TextField
              variant="filled"
              color="success"
              focused
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
              placeholder="Add room number"
              className={productStyles.textField}
              InputProps={{
                className: productStyles.roomNumber,
              }}
            />
          </Box>
          <Box
            className={productStyles.itemCount}
            sx={{ padding: "15px 0 20px 0 !important" }}
          >
            Payment method
          </Box>
          <Box sx={{ display: "flex", paddingBottom: "20px !important" }}>
            <Button
              className={
                productStyles.paymentMethod +
                " " +
                (selectedPayment == "pay" ? productStyles.active : "")
              }
              variant="text"
              fullWidth
              onClick={() => setSelectedPayment("pay")}
            >
              <img
                className={cartStyles.cartNotiImage}
                src={
                  selectedPayment == "pay" ? "/apple-white.svg" : "/apple.svg"
                }
                alt="Your alt text"
              />
            </Button>
            <Button
              className={
                productStyles.paymentMethod +
                " " +
                (selectedPayment == "credit" ? productStyles.active : "")
              }
              variant="text"
              fullWidth
              onClick={() => setSelectedPayment("credit")}
            >
              Credit Card
            </Button>
            <Button
              className={
                productStyles.paymentMethod +
                " " +
                (selectedPayment == "cash" ? productStyles.active : "")
              }
              variant="text"
              fullWidth
              onClick={() => setSelectedPayment("cash")}
            >
              Cash through Checkout
            </Button>
          </Box>
          {selectedPayment == "credit" && (
            <Box>
              <Box sx={{ paddingBottom: "5px" }}>
                <Elements stripe={stripePromise}>
                  <CardElement
                    className={productStyles.cardElement}
                    id="card-element"
                    options={cardStyle}
                  />
                </Elements>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <img
                    className={productStyles.poweredbyimg}
                    src="/poweredby.svg"
                    alt="Your alt text"
                  />
                  <img
                    className={productStyles.stripeimg}
                    src="/stripe.svg"
                    alt="Your alt text"
                  />
                </Box>
                <Box>
                  <img
                    className={productStyles.cardStyle}
                    src="/Visa.svg"
                    alt="Your alt text"
                  />
                  <img
                    className={productStyles.cardStyle}
                    src="/Discover.svg"
                    alt="Your alt text"
                  />
                  <img
                    className={productStyles.cardStyle}
                    src="/union_pay.svg"
                    alt="Your alt text"
                  />
                  <img
                    className={productStyles.cardStyle}
                    src="/american_express.svg"
                    alt="Your alt text"
                  />
                  <img
                    className={productStyles.cardStyle}
                    src="/mastercard.svg"
                    alt="Your alt text"
                  />
                </Box>
              </Box>
            </Box>
          )}
          <Box className={productStyles.showMoreBody}>
            {selectedPayment !== "pay" && (
              <Button
                className={productStyles.showMore}
                variant="text"
                fullWidth
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            )}
            {selectedPayment === "pay" && (
              <Button
                className={
                  productStyles.showMore + " " + productStyles.blackButton
                }
                variant="text"
                fullWidth
                onClick={handleCheckout}
              >
                <img
                  className={cartStyles.cartNotiImage}
                  src={
                    selectedPayment == "pay" ? "/apple-white.svg" : "/apple.svg"
                  }
                  alt="Your alt text"
                />
              </Button>
            )}
          </Box>
        </Box>
      </Layout>
    </Box>
  );
}
