import { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import useSwr from "swr";
import Image from "next/image";
import { Layout } from "../components/layout/Layout";
import { RoomHeader } from "../components/room/RoomHeader";
import { RoomInfo } from "../components/room/RoomInfo";
import { ProductsRecommended } from "../components/products/ProductsRecommended";
import { Products } from "../components/products/Products";
import { CartNotification } from "../components/cart/CartNotification";
import styles from "../styles/Home.module.css";
import productStyles from "../styles/Product.module.css";

import type { Product } from "../interfaces";
import { getCarts } from "../components/cart/hooks/useCart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Restarant() {
  const { data, error } = useSwr<Product[]>("/api/products", fetcher);
  const [cart, setCart] = useState([]);

  const productList = data && data.length ? data : [];
  const handleCart = (value: any) => {
    setCart(value);
  };
  const [carts, setCarts] = useState({ totalItems: 0 });

  useEffect(() => {
    setCarts(getCarts());
  }, [cart]);

  const productsByCategory: {
    category: string;
    products: Array<Product>;
  }[] = [];
  const categories = productList.map(
    (each) => each.fields["Name (from nomenclature_category_id)"][0]
  );

  let uniqueCategories = categories.filter((each, index) => {
    return categories.indexOf(each) === index;
  });

  uniqueCategories.map((each) => {
    productsByCategory.push({
      category: each,
      products: productList.filter(
        (eachProduct) =>
          eachProduct.fields["Name (from nomenclature_category_id)"][0] == each
      ),
    });
  });
  return (
    <Box sx={{ paddingBottom: carts.totalItems ? "70px" : "0px" }}>
      <Layout>
        <RoomHeader />
        <Box className={styles.content} sx={{ marginBottom: "-10px" }}>
          <RoomInfo />
          <Box
            sx={{
              display: "flex",
              paddingTop: "30px",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/menu-icon.svg"
                alt=""
                width={19}
                height={18}
                priority
              />
              <Box
                component="span"
                className={productStyles.textStyle}
                sx={{ paddingLeft: "10px" }}
              >
                Menu
              </Box>
            </Box>
            <Box
              className={styles.orderMenuScroll}
              sx={{ marginLeft: "-5px !important", paddingTop: "20px" }}
            >
              <Stack className={styles.orderMenu} direction="row" spacing={1}>
                {productsByCategory.map((each, index) => (
                  <Link
                    key={index}
                    href={"/restarant_page#" + each.category.toLowerCase()}
                    scroll={false}
                  >
                    {each.category}
                  </Link>
                ))}
                <Link href="/restarant_page" scroll={false}>
                  more
                </Link>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ width: "100%", marginTop: "5px !important" }}>
            {productsByCategory.map((each, index) => {
              return (
                <Box key={index}>
                  <Box
                    className={productStyles.categoryName}
                    id={each.category.toLowerCase()}
                  >
                    {each.category}
                  </Box>
                  <Box>
                    <Products
                      products={each.products}
                      handleCart={handleCart}
                      isRestarant={true}
                      isCheckout={false}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {carts.totalItems ? <CartNotification products={productList} /> : ""}
      </Layout>
    </Box>
  );
}
