import styles from "./Loading.module.css";

export const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  );
};
