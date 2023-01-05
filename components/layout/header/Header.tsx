import { Logo } from "../logo/Logo";
import styles from "../../../styles/Home.module.css";

export const Header = () => {
  return (
    <header className={styles.logo}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Logo />
        </nav>
      </div>
    </header>
  );
};
