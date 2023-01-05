import Box from "@mui/material/Box";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../components/layout/Layout";
import styles from "../styles/Home.module.css";

export default function SuccessOrder() {
  const router = useRouter();
  return (
    <Box sx={{ paddingBottom: "0px" }}>
      <Layout mainStyle={styles.successContainer}>
        <Box className={styles.successIcon}>
          <Image
            src="/success.svg"
            alt="Potato Head Logo"
            width={75}
            height={75}
            priority
          />
        </Box>
        <Box className={styles.orderCreatedStyle}>
          Order #{router.query.room} Created
        </Box>
        <Box className={styles.orderSuccessText} sx={{ padding: "10px" }}>
          you are Rock 🤟
        </Box>
        <Box className={styles.orderSentInfo}>Your order’s sent to resto</Box>
        <Box className={styles.orderExpiredDate} sx={{ paddingTop: "10px" }}>
          Resto will confirm it (2:44)
        </Box>
      </Layout>
    </Box>
  );
}
