import Image from "next/image";

export const Logo = () => (
  <div>
    <Image
      src="/potato-head-logo.png"
      alt="Potato Head Logo"
      width={62}
      height={45}
      priority
    />
  </div>
);
