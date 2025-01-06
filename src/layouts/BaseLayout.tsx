import { AlertDialogCustom } from "@/components/custom/AlertDialogCustom";
import { ButtonActionSetting } from "@/components/custom/ButtonActionSetting";
import { useAuth } from "@/features/auth/contexts/useAuth";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { toast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { pageRoutes, pathRoutes } from "@/routes/PageRoutes";
import { LocalStorageHelpers } from "@/utilities/localStorageHelpers";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileSideBar } from "./MobileSideBar";
import { SideBar } from "./SideBar";

type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const isAboveSmallScreen = useMediaQuery("(min-width: 768px)");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [openAlertDialogSignOut, setOpenAlertDialogSignOut] = useState(false);
  const [openAlertDialogSession, setOpenAlertDialogSession] = useState(false);
  const { authState, setRoutePosition, removeSession } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const onSignOut = () => {
    return signOut.mutate(undefined, {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Sign Out Success",
          description: `${response.message}`,
        });

        setOpenAlertDialogSignOut(false);
        removeSession();
      },
      onError: () => {
        toast({
          duration: 1000,
          title: "Something Error",
          description: "Redirect to Sign In Page",
          variant: "destructive",
        });
        removeSession();
      },
    });
  };

  useEffect(() => {
    navigate(location.pathname);
    setRoutePosition(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!LocalStorageHelpers.getSession()) {
      setOpenAlertDialogSession(true);
    }
  }, [authState.routePosition]);

  const onClickNavigation = (path: string) => {
    if (path !== authState.routePosition) {
      setRoutePosition(path);
      navigate(path);
    }
  };

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      {isAboveSmallScreen && <SideBar onClickNavigation={onClickNavigation} />}

      {/* MOBILE SIDEBAR */}
      {!isAboveSmallScreen && isMobileSidebarOpen && (
        <div
          className="z-30 absolute bg-transparent h-screen w-full"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <MobileSideBar
            closeSideBar={() => setIsMobileSidebarOpen(false)}
            onSignOut={() => setOpenAlertDialogSignOut(true)}
            onClickNavigation={onClickNavigation}
          />
        </div>
      )}

      <div className="w-full flex flex-col">
        {/* HEADER */}
        <nav
          className={`flex py-6 px-5 items-center border-b-[1px] ${
            !isAboveSmallScreen && "justify-between"
          }`}
        >
          <div className="flex justify-between items-center w-full">
            <p className="font-bold text-2xl">
              {
                pageRoutes.find(
                  (route) => route.path === authState.routePosition
                )?.title
              }
            </p>
            {isAboveSmallScreen && (
              <ButtonActionSetting
                onClickProfile={() => onClickNavigation(pathRoutes.profile)}
                onClickSignOut={() => setOpenAlertDialogSignOut(true)}
              />
            )}
          </div>
          {!isAboveSmallScreen && (
            <Menu onClick={() => setIsMobileSidebarOpen(true)} />
          )}
        </nav>

        {/* CONTENT */}
        <section className="flex-1 p-8 overflow-scroll">{children}</section>
      </div>

      <AlertDialogCustom
        alertDialogTitle="Sign out?"
        alertDialogDescription="Are you sure you want to sign out? You’ll need to log in again to access your account."
        openAlertDialog={openAlertDialogSignOut}
        closeAlertDialog={() => setOpenAlertDialogSignOut(false)}
        actionAlertDialog={onSignOut}
      />

      <AlertDialogCustom
        isCanCancel
        alertDialogTitle="Session Expired?"
        alertDialogDescription="For your security, your session has expired due to inactivity. Please log in again to continue."
        openAlertDialog={openAlertDialogSession}
        closeAlertDialog={() => setOpenAlertDialogSession(false)}
        actionAlertDialog={onSignOut}
      />
    </div>
  );
};
