import { Outlet } from "react-router-dom";
import { Header } from "../ui/Header";
import { Footer } from "../ui/Footer";

export const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
