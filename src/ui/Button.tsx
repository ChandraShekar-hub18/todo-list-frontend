import { ReactNode } from "react";
import styles from "./Button.module.css";

export const Button: React.FC<{
  children: ReactNode;
  primary: boolean;
}> = ({ children, primary }) => {
  return <div className={primary ? styles.primary : ""}>{children}</div>;
};
