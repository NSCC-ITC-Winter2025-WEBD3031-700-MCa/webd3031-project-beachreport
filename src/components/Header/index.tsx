"use client";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const [beaches, setBeaches] = useState([]);
  const { data: session } = useSession();
  const pathUrl = usePathname();

  useEffect(() => {
    console.log("Session data:", session);
  }, [session]);

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const response = await fetch("/api/beaches");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setBeaches(data || []);
      } catch (error) {
        console.error("Error fetching beaches:", error);
      }
    };

    fetchBeaches();
  }, []);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };
  
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);
  

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const { theme, setTheme } = useTheme();

  return (
    <>
      <header
        className={`ud-header left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${
          sticky
            ? "shadow-nav fixed z-[999] border-b border-stroke bg-white/80 backdrop-blur-[5px] dark:border-dark-3/20 dark:bg-dark/10"
            : "fixed bg-white/50"
        }`}
      >

        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link
                href="/"
                className={`navbar-logo block w-full ${sticky ? "py-2" : "py-1"}`}
              >
                <Image
                  src="/images/logo/shorecast-logo.png"
                  alt="logo"
                  width={75}
                  height={75}
                  className="header-logo dark:hidden"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                    navbarOpen ? " top-[7px] rotate-45" : ""
                  } ${pathUrl !== "/" ? "!bg-dark dark:!bg-white" : sticky ? "bg-dark dark:bg-white" : "bg-white"}`} />
                  <span className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                    navbarOpen ? "opacity-0" : ""
                  } ${pathUrl !== "/" ? "!bg-dark dark:!bg-white" : sticky ? "bg-dark dark:bg-white" : "bg-white"}`} />
                  <span className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                    navbarOpen ? " top-[-8px] -rotate-45" : ""
                  } ${pathUrl !== "/" ? "!bg-dark dark:!bg-white" : sticky ? "bg-dark dark:bg-white" : "bg-white"}`} />
                </button>

                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark-2 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:dark:bg-transparent ${
                    navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:ml-8 lg:flex lg:gap-x-8 xl:ml-14 xl:gap-x-12">
                    {menuData.map((menuItem, index) =>
                      menuItem.path ? (
                        <li key={index} className="group relative">
                          <Link
                            scroll={false}
                            href={menuItem.path}
                            onClick={navbarToggleHandler}
                            className={`ud-menu-scroll flex py-2 text-amber-700 group-hover:text-amber-700 dark:text-amber-700 dark:group-hover:text-amber-700 lg:inline-flex lg:px-0 lg:py-6 ${
                              pathUrl === menuItem?.path && "text-cyan-500"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      ) : (
                        <li className="submenu-item group relative" key={index}>
                          <button
                            onClick={() => handleSubmenu(index)}
                            className="ud-menu-scroll flex items-center justify-between py-2 text-amber-700 group-hover:text-cyan-500 dark:text-amber-700 dark:group-hover:text-cyan-500 lg:inline-flex lg:px-0 lg:py-6"
                          >
                            {menuItem.title}
                            <span className="pl-1">⌄</span>
                          </button>
                          <div
                            className={`submenu relative left-0 top-full w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                              openIndex === index ? "!-left-[25px]" : "hidden"
                            }`}
                          >
                            {beaches.length > 0 ? (
                              beaches.map((beach: any, i: number) => (
                                <Link
                                  href={`/beaches/${beach.slug}`}
                                  key={i}
                                  className={`block rounded px-4 py-[10px] text-sm ${
                                    pathUrl === `/beaches/${beach.slug}`
                                      ? "text-cyan-500"
                                      : "text-body-color hover:text-cyan-500 dark:text-dark-6 dark:hover:text-cyan-500"
                                  }`}
                                >
                                  {beach.name}
                                </Link>
                              ))
                            ) : (
                              <p className="px-4 py-2 text-sm text-gray-500">No beaches found.</p>
                            )}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>

              <div className="hidden items-center justify-end pr-16 sm:flex lg:pr-0">
                {session?.user?.isAdmin && (
                  <Link
                    onClick={navbarToggleHandler}
                    scroll={false}
                    href="/dashboard"
                    className="ud-menu-scroll text-decoration-none flex py-2 text-amber-700 group-hover:text-amber-700 dark:text-amber-700 dark:group-hover:text-amber-700 lg:inline-flex lg:px-0 lg:py-6"
                  >
                    Dashboard
                  </Link>
                )}

                {session?.user ? (
                  <>
                    <p className="loginBtn px-7 py-3 text-base font-medium text-amber-700">
                      {session?.user?.name}
                    </p>
                    <button
                      onClick={() => signOut()}
                      className="signUpBtn rounded-lg bg-cyan-500 bg-opacity-100 px-6 py-3 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-80"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="px-7 py-3 text-base font-medium text-amber-700 hover:text-amber-800"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="rounded-lg bg-amber-700 px-6 py-3 text-base font-medium text-white duration-300 ease-in-out hover:bg-amber-800"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
