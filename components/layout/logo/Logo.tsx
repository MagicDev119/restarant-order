import Image from "next/image";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export const Logo = () => {
  const router = useRouter();

  return (
    <Box
      onClick={() => router.push("/room_service")}
      sx={{ cursor: "pointer" }}
    >
      <Image
        src="/intheroom-logo.svg"
        alt="Potato Head Logo"
        width={77}
        height={31}
        priority
      />
    </Box>
  );
};
