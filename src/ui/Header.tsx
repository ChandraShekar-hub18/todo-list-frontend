import { IoIosLogOut } from "react-icons/io";
import styles from "./Header.module.css";
import { useAuth } from "../context/AuthContext";
import { redirect } from "react-router-dom";

export const Header: React.FC = () => {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    redirect("/");
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>TODO-LIST</h1>
      <p className={styles.logout} onClick={() => handleLogout()}>
        <IoIosLogOut /> <span>logout</span>
      </p>
    </header>
  );
};
