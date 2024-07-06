import { Link, Outlet } from "react-router-dom";
import styles from "./AuthPage.module.css";

export const AuthPage: React.FC = () => {
  return (
    <>
      <header>
        <Link className={styles.title} to="/">
          TodoList
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <section>
            <img className={styles.loginImage} src="/images/login.jpg" />
          </section>
          <section>
            <Outlet />
          </section>
        </div>
      </main>
    </>
  );
};
