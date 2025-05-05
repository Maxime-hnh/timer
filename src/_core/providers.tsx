"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { AppLoader } from "./appLoader";
import Footer from "@/_components/layout/footer";
import { ThemeColorOverride } from "./themeColorOverride";
import { MOBILE_SIZE } from "@/_helper/constants";
import useWindowSize from "@/_hooks/useWindowSize";
import AppContext from "@/app/context/AppContext";
import { Toaster } from "@/_components/ui/sonner";


export function Providers(props: PropsWithChildren) {

  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_SIZE;
    setIsMobile(isMobile);
    const vh = window.innerHeight * 0.01;
    if (isMobile) document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [width]);

  return (
    <>
      <Toaster />
      <AppContext.Provider value={{
        isMobile,
      }}>
        <ThemeColorOverride />
        <AppLoader>

          <div className="flex min-h-screen flex-col" id="rootLayout">
            <main className="flex-1">{props.children}</main>

            <Footer />
          </div>
        </AppLoader>
      </AppContext.Provider>
    </>
  );
}
