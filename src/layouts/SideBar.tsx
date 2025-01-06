import yacht from "@/assets/yacht.svg";
import { ButtonIcon } from "@/components/custom/ButtonIcon";
import { useAuth } from "@/features/auth/contexts/useAuth";
import { pageRoutes, pathRoutes } from "@/routes/PageRoutes";
import { useNavigate } from "react-router-dom";

type SideBarProps = {
  onSignOut: () => void;
};

export const SideBar = ({ onSignOut }: SideBarProps) => {
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
    <div className="border-r-[1px] flex flex-col items-center py-2 px-4 transition-width duration-300 w-72 ">
      {/* SIDEBAR HEADER */}
      <header
        onClick={() => {}}
        className="cursor-pointer flex flex-col items-center"
      >
        <img
          src={yacht}
          alt="Yacht Vector"
          className="bg-primary rounded-md w-1/3"
        />
        <h1 className="text-sm font-semibold">Boat Ticketing</h1>
      </header>

      {/* SIDEBAR CONTENT */}
      <nav className="my-5 border rounded-lg w-full overflow-auto">
        {pageRoutes
          .filter((route) =>
            session === "SUPERADMIN"
              ? route.type === "protected"
              : route.type === "protected" && route.path !== pathRoutes.port
          )
          .map((route) => (
            <p
              key={route.title}
              onClick={() => onClickNavigation(route.path)}
              className={`block p-2 m-2 rounded-md hover:bg-gray-200 transition cursor-pointer ${
                authState.routePosition === route.path
                  ? "bg-primary text-white hover:bg-primary"
                  : ""
              }`}
            >
              {route.title}
            </p>
          ))}
      </nav>

      {/* SIDEBAR FOOTER */}
      <footer className="mt-auto w-full">
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
