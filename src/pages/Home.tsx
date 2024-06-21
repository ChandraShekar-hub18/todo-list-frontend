import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { Button } from "../ui/Button";

export const Home: React.FC = () => {
  return (
    <>
      <header>
        <div className={styles.title}>TodoList</div>
        <div className={styles.options}>
          <ul>
            <li>
              <Link to="/about" className={styles.subHeader}>
                about
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.subHeader}>
                contact
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className={styles.login}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <article>
          <h1 className={styles.intro}>
            Organize work and life by using using Todo-List📝
          </h1>
          <Button primary>
            <Link to="/auth/login">Start</Link>
          </Button>
        </article>
        <section className={styles.section}>
          <section>
            <h1>Add your Notes on your tips..</h1>
            <p>Easy and fast to add your notes. Beginner friendly🥰.</p>
          </section>
          <img src="/images/todolist.svg" className={styles.img}></img>
        </section>
      </main>
      <footer>
        <p>Made with ❤️ by chandra shekar</p>
      </footer>
    </>
  );
};
