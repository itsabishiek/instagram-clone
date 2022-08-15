import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Navbar from "../navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <>
      {!(router.pathname === "/login" || router.pathname === "/signup") && (
        <Navbar user={user} />
      )}
      <main>{children}</main>
    </>
  );
};
export default Layout;
