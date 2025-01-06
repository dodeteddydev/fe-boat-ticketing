import { ButtonIcon } from "@/components/custom/ButtonIcon";
import { useAuth } from "@/features/auth/contexts/useAuth";
import { pageRoutes, pathRoutes } from "@/routes/PageRoutes";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type MobileSideBarProps = {
  closeSideBar: () => void;
  onSignOut: () => void;
};

export const MobileSideBar = ({
  closeSideBar,
  onSignOut,
}: MobileSideBarProps) => {
  const { authState, setRoutePosition } = useAuth();
  const navigate = useNavigate();

  const onClickNavigation = (path: string) => {
    if (path !== authState.routePosition) {
      setRoutePosition(path);
      navigate(path);
    }
  };

  const session = authState.session?.split("|")[0];

  return (
    <div className="flex flex-col z-50 absolute top-0 right-0 h-full w-64 bg-white shadow-2xl border-s-[1px] rounded-s-xl">
      {/* SIDEBAR HEADER */}
      <header className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Menu</h2>
        <X onClick={closeSideBar} />
      </header>

      {/* SIDEBAR CONTENT */}
      <nav className="p-4 overflow-auto">
        <ul>
          {pageRoutes
            .filter((route) =>
              session === "SUPERADMIN"
                ? route.type === "protected"
                : route.type === "protected" && route.path !== pathRoutes.port
            )
            .map((route) => (
              <li
                key={route.path}
                onClick={() => onClickNavigation(route.path)}
                className={`py-2 ${
                  authState.routePosition === route.path ? "text-primary" : ""
                }`}
              >
                {route.title}
              </li>
            ))}
        </ul>
      </nav>

      {/* SIDEBAR FOOTER */}
      <footer className="mt-auto mb-2 w-full">
        <div className="flex justify-center items-center gap-2">
          <ButtonIcon onClick={onSignOut} />
          <p className="font-semibold">Sign Out</p>
        </div>
        <p className="text-center text-xs mt-3">
          Copyright &copy; {new Date().getFullYear()} Boat Ticketing
        </p>
      </footer>
    </div>
  );
};
