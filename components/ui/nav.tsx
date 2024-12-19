"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { text: "Home", href: "/" },
  { text: "Learn with Images", href: "/learn-with-images" },
  { text: "Learn with Music", href: "/learn-with-music" },
  { text: "Learn with Videos", href: "/learn-with-videos" },
];

const Nav = () => {
  const [state, setState] = useState(false);
  const [showNav, setShowNav] = useState(true); // To control nav visibility
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const handleLinkClick = () => setState(false);

  // Scroll behavior logic

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setShowNav(false); // Hide navbar on scroll down
        setState(false);
      } else {
        setShowNav(true); // Show navbar on scroll up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-sm  transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full shadow-sm"
      }`}
    >
      <nav className="relative z-30 items-center py-3 px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
        <div className="flex justify-between">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center"
          >
            <Image
              src={"/assets/images/Logo.svg"}
              width={160}
              height={100}
              alt="Alpha Kids Logo"
              priority
            />
          </Link>
          <button
            className="text-gray-500 outline-none sm:hidden"
            onClick={() => setState(!state)}
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`bg-white sm:bg-transparent z-30 shadow-md rounded-md p-4 flex-1 mt-12 absolute top-8 right-4 w-64 border sm:shadow-none sm:block sm:border-0 sm:mt-0 sm:static sm:w-auto ${
            state ? "" : "hidden"
          }`}
        >
          <div className="order-1 justify-end items-center space-y-5 sm:flex sm:space-x-6 sm:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={
                    pathname === item.href
                      ? "text-orange-600 font-bold"
                      : "text-gray-500 hover:text-orange-600 font-medium"
                  }
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
