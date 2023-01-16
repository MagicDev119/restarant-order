import Box from "@mui/material/Box";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
import styles from "../styles/Home.module.css";

export default function SuccessOrder() {
  const router = useRouter();
  const curTime = new Date().getTime();
  const [currentTime, setCurrentTime] = useState(3 * 60 * 1000);
  const [showConfirm, setShowConfirm] = useState(false);
  const millisToMinutesAndSeconds = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      setCurrentTime(3 * 60 * 1000 - now + curTime);
      if (now - curTime >= 3 * 60 * 1000) {
        clearInterval(intervalId);
        setShowConfirm(true);
        // router.push({
        //   pathname: "/room_service",
        // });
      }
    }, 1000);
  }, []);

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
          Order #{router.query.orderId} Created
        </Box>
        <Box className={styles.orderSuccessText} sx={{ padding: "10px" }}>
          you are Rock 🤟
        </Box>
        <Box className={styles.orderSentInfo}>Your order’s sent to resto</Box>
        <Box
          className={styles.orderExpiredDate}
          sx={{
            paddingTop: "10px",
            color: showConfirm ? "#FF5C4D !important" : "#21201F",
            fontWeight: showConfirm ? "700 !important" : 400,
          }}
        >
          {showConfirm
            ? "Confirm order manually please call in into reception"
            : "Resto will confirm it (" +
              millisToMinutesAndSeconds(currentTime) +
              ")"}
        </Box>
      </Layout>
    </Box>
  );
}
