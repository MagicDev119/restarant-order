import styles from "../../styles/Home.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";

export const RoomInfo = () => (
  <div>
    <div className={styles.topcontent}>
      <span className={styles.title}>MEDICI | kitchen & bar</span>
      <span className={styles.location}>Western, Sweets, FastFood</span>
    </div>
    <div className={styles.status}>
      <Box>
        <div className={styles.header}>
          <Image src="/watch.svg" alt="" width={11} height={17} priority />
          <span className={styles.value}>10 min</span>
        </div>
        <div className={styles.footer}>
          <span>Room delivery</span>
        </div>
      </Box>
      <Box sx={{ paddingLeft: "10px", borderLeft: "1px solid #F5F4F2" }}>
        <div className={styles.header}>
          <Image src="/watch.svg" alt="" width={11} height={17} priority />
          <span className={styles.value}>7am - 10pm</span>
        </div>
        <div className={styles.footer}>
          <span>Working hours</span>
        </div>
      </Box>
      <Box sx={{ paddingLeft: "10px", borderLeft: "1px solid #F5F4F2" }}>
        <div className={styles.header}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.footer}>
          <span>Avaliable for order</span>
        </div>
      </Box>
    </div>
  </div>
);
