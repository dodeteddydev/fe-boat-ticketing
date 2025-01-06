import { ButtonActionSetting } from "@/components/custom/ButtonActionSetting";
import { useAuth } from "@/features/auth/contexts/useAuth";
import { pageRoutes, pathRoutes } from "@/routes/PageRoutes";
import { X } from "lucide-react";

type MobileSideBarProps = {
  closeSideBar: () => void;
  onSignOut: () => void;
  onClickNavigation: (path: string) => void;
};

export const MobileSideBar = ({
  closeSideBar,
  onSignOut,
  onClickNavigation,
}: MobileSideBarProps) => {
  const { authState } = useAuth();

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
                ? route.type === "protected" &&
                  route.path !== pathRoutes.profile
                : route.type === "protected" &&
                  route.path !== pathRoutes.port &&
                  route.path !== pathRoutes.profile
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
      <footer className="flex flex-col items-center mt-auto mb-2">
        <ButtonActionSetting
          onClickProfile={() => onClickNavigation(pathRoutes.profile)}
          onClickSignOut={() => onSignOut()}
        />
        <p className="text-xs mt-3">
          Copyright &copy; {new Date().getFullYear()} Boat Ticketing
        </p>
      </footer>
    </div>
  );
};
