import { SignInPage } from "@/features/auth/pages/SignInPage";
import { SignUpPage } from "@/features/auth/pages/SignUpPage";
import { BoatCompanyPage } from "@/features/boat-company/pages/BoatCompanyPage";
import { BoatPage } from "@/features/boat/pages/BoatPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { PortPage } from "@/features/port/pages/PortPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { SchedulePage } from "@/features/schedule/pages/SchedulePage";
import { RouteType } from "@/types/routeType";

export const pathRoutes = {
  signIn: "/signin",
  signUp: "/signup",
  profile: "/profile",
  dashboard: "/",
  boatCompany: "/boatcompany",
  boat: "/boat",
  port: "/port",
  schedule: "/schedule",
};

export const pageRoutes: RouteType[] = [
  {
    path: pathRoutes.signIn,
    element: <SignInPage />,
    type: "public",
    title: "Sign In",
  },
  {
    path: pathRoutes.signUp,
    element: <SignUpPage />,
    type: "public",
    title: "Sign Up",
  },
  {
    path: pathRoutes.profile,
    element: <ProfilePage />,
    type: "protected",
    title: "Profile",
  },
  {
    path: pathRoutes.dashboard,
    element: <DashboardPage />,
    type: "protected",
    title: "Dashboard",
  },
  {
    path: pathRoutes.boatCompany,
    element: <BoatCompanyPage />,
    type: "protected",
    title: "Boat Company",
  },
  {
    path: pathRoutes.boat,
    element: <BoatPage />,
    type: "protected",
    title: "Boat",
  },
  {
    path: pathRoutes.port,
    element: <PortPage />,
    type: "protected",
    title: "Port",
  },
  {
    path: pathRoutes.schedule,
    element: <SchedulePage />,
    type: "protected",
    title: "Schedule",
  },
];
