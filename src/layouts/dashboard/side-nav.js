import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import services from "src/services";
import { useState } from "react";
import Toaster from "src/components/toaster";
import { useRouter } from "next/router";

export const SideNav = (props) => {
  const router = useRouter();
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [toaster, setToaster] = useState({ visiblity: "hide" });

  const LOGOUT = async () => {
    const refreshToken = sessionStorage.getItem("access_token");

    try {
      const data = {
        refreshToken: refreshToken,
      };

      const response = await services.auth.LOGOUT(data);

      if (response) {
        setToaster({
          type: "success",
          title: "Successful",
          text: "LogOut successfully",
          visiblity: "show",
        });
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("authenticated");
        setTimeout(() => {
          router.push("/auth/login");
        }, 500);
      }
    } catch (error) {
      setToaster({
        type: "error",
        title: "Error Occured",
        text: "Error",
        visiblity: "show",
      });
      setTimeout(() => {
        setToaster({
          visiblity: "hide",
        });
      }, 1500);
    }
  };

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Toaster
        type={toaster.type}
        title={toaster.title}
        text={toaster.text}
        visiblity={toaster.visiblity}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            {/* <Logo /> */}
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="neutral.400" variant="body2">
                Air Hotel
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}></SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {items
              .filter((item) => item.title !== "Logout")
              .map((item) => {
                const active = item.path ? pathname === item.path : false;
                const handleClick = () => {
                  console.log(`Item ${item.title} clicked!`);
                };
                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                    onClick={handleClick}
                  />
                );
              })}
          </Stack>
          <div
            style={{
              marginTop: 10,
              marginLeft: 16,
              color: "#9DA4AE",
              paddingBottom: 5,
              cursor: "pointer",
              display: "flex",
            }}
            onClick={LOGOUT}
          >
            <SvgIcon fontSize="small">
              <LockClosedIcon />
            </SvgIcon>
            <span
              style={{ marginLeft: 15, paddingBottom: 20, fontSize: "0.9rem", fontWeight: 600 }}
            >
              Logout
            </span>
          </div>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
