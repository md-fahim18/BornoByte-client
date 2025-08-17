import React, { useEffect, useState } from "react";

import { Outlet, useLocation, useNavigation } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Loader from "../shared/Loader";
const MainLayout = () => {
   const location = useLocation();
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    setLoading(true);

    // ছোট delay দিলে smooth effect হয়
    const timer = setTimeout(() => setLoading(false), 400);

    return () => clearTimeout(timer);
  }, [location]);
  return (
    <div
      className="w-full px-4 mx-auto 
                max-w-[570px]
                sm:max-w-[860px]
                md:max-w-[1024px]
                lg:max-w-[1280px]
               "
    >
      <Navbar />
      {loading ? <Loader /> : <Outlet />}
     <Footer></Footer>
    </div>
  );
};

export default MainLayout;
