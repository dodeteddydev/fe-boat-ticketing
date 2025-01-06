import yacht from "@/assets/yacht.svg";

export const LeftSection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-primary max-sm:bg-transparent max-lg:h-full">
      <header className="sm:hidden mt-3">
        <p className="text-2xl font-semibold">Boat Ticketing</p>
      </header>
      <img src={yacht} alt="Yacht Vector" className="w-3/4 max-lg:w-1/2" />
      <footer className="text-center text-secondary">
        <p className="text-4xl max-lg:text-2xl max-sm:hidden font-semibold">
          Boat Ticketing
        </p>
        <p className="text-xs max-sm:hidden">
          Copyright &copy; {new Date().getFullYear()} Boat Ticketing
        </p>
      </footer>
    </div>
  );
};
