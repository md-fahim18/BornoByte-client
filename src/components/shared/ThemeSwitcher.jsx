// import  { useState, useEffect } from "react";

// const ThemeSwitcher = () => {
//   const storedTheme = localStorage.getItem("theme") || "light";
//   const [theme, setTheme] = useState(storedTheme);

//   useEffect(() => {
//     // Set theme on page load
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//   };

//   return (
//     <label className="grid cursor-pointer place-items-center">
//       <input
//         type="checkbox"
//         className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
//         checked={theme === "retro"}
//         onChange={toggleTheme}
//       />


      
//         {/* Moon Icon */}
//         <svg
//         className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
//         xmlns="http://www.w3.org/2000/svg"
//         width="14"
//         height="14"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
//       </svg>
//       {/* Sun Icon */}
//       <svg
//         className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
//         xmlns="http://www.w3.org/2000/svg"
//         width="14"
//         height="14"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="5" />
//         <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
//       </svg>
    
//     </label>
//   );
// };

// export default ThemeSwitcher;
import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-14 text-important-text dark:text-important-text-dark hover:scale-110 transition-all duration-300 ease-in-out"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <svg
          className="w-full h-full transition-transform duration-300 ease-in-out rotate-0 hover:rotate-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 1v3M12 20v3M3 12h3M18 12h3M4.2 4.2l2.1 2.1M16.8 16.8l2.1 2.1M4.2 19.8l2.1-2.1M16.8 7.2l2.1-2.1" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ) : (
        <svg
          className="w-full h-full transition-transform duration-300 ease-in-out scale-100 hover:scale-105 hover:-rotate-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="M16 12a4 4 0 1 1-4-4" strokeWidth="1" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitcher;