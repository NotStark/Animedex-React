import logo from "../assets/logo.svg";
import { RiSearchLine } from "react-icons/ri";
import { PiTagChevronFill } from "react-icons/pi";
import { useState, useEffect, useRef, forwardRef, useCallback, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLightMode, MdOutlineMenuOpen, MdDarkMode } from "react-icons/md";

// No Need of isMobile state can be done through css only - reminder to myself

export default function Navbar() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, [setIsMenuOpen, isMenuOpen]);

  const handleThemeEvent = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key === "D") {
      toggleTheme();
    }
  };

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme, theme]);

  const handleSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()
    isMobile && isMenuOpen && toggleMenu();
    navigate(`/search/${inputRef.current?.value}`)
  }
  ,[inputRef.current?.value , isMobile , isMenuOpen]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    window.addEventListener("keydown", handleThemeEvent);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleThemeEvent);
    };
  }, [theme, isMobile]);

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-8 lg:px-12 py-2 w-full bg-backgroundColor/45 backdrop-blur-md ">
      <div>
        <img
          src={logo}
          alt="Animedex Logo"
          className="w-28 sm:w-36 md:w-52 relative z-50 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      {isMobile ? (
        <div>
          <button
            className="text-2xl text-textColor focus:outline-none relative z-50"
            onClick={toggleMenu}
          >
            <MdOutlineMenuOpen />
          </button>
          {isMenuOpen && (
            <MobileMenu
              isMobile={isMobile}
              toggleMenu={toggleMenu}
              toggleTheme={toggleTheme}
              theme={theme}
              handleSearch={handleSearch}
              ref={inputRef}
            />
          )}
        </div>
      ) : (
        <MobileMenu
          isMobile={isMobile}
          toggleMenu={toggleMenu}
          toggleTheme={toggleTheme}
          theme={theme}
          handleSearch={handleSearch}
          ref={inputRef}
        />
      )}
    </nav>
  );
}

const MobileMenu = forwardRef<
  HTMLInputElement,
  {
    isMobile: boolean;
    theme: string;
    toggleMenu: () => void;
    toggleTheme: () => void;
    handleSearch: (e: FormEvent<HTMLFormElement>) => void;
  }
>(({ isMobile, toggleMenu, toggleTheme, theme, handleSearch }, ref) => {
  return (
    <div
      className={`
      transition-all duration-500
        ${
          isMobile
            ? "absolute z-[45]  top-0 left-0 bg-backgroundColor p-4 w-full h-[50vh] rounded-b-md flex flex-col items-center justify-center gap-5"
            : "flex items-center justify-between w-1/2 gap-8"
        }
          `}
    >
      <form className="flex items-center gap-3 bg-textColor/5 rounded-sm px-4 py-3 w-full" onSubmit={handleSearch}>
        <input
          type="text"
          name="Search Bar"
          placeholder="Search Animes..."
          className="bg-transparent outline-none border-none w-full text-sm"
          ref={ref}
        />
        <span className="w-[2px] h-5 bg-textColor rounded-md"></span>
        <button className="text-lg cursor-pointer" type="submit">
          <RiSearchLine />
        </button>
      </form>
      <div className="flex items-center gap-4">
        <h5
          className="text-lg bg-textColor/10 p-2 rounded-md hover:border-2 border-textColor cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </h5>
        <Link
          to={"/watchlist"}
          className="text-lg bg-textColor/10 p-2 rounded-md hover:border-2 cursor-pointer rotate-90 border-textColor"
          onClick={toggleMenu}
        >
          <PiTagChevronFill />
        </Link>
      </div>
    </div>
  );
});
