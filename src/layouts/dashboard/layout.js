import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { useRouter } from "next/router";
import { useAuthContext } from "src/contexts/auth-context";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = withAuthGuard((props) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    if (pathname === "/" && isAuthenticated === false) {
      router.push("/auth/login");
    } else{
      
    }
  }, [pathname]);

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <TopNav onNavOpen={() => setOpenNav(true)} />
          <SideNav onClose={() => setOpenNav(false)} open={openNav} />
          <LayoutRoot>
            <LayoutContainer>{children}</LayoutContainer>
          </LayoutRoot>
        </>
      ) : (
        ""
      )}
    </>
  );
});
