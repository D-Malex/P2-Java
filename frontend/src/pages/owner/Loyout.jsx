import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Footer";

function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
