import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeButton() {
  const [theme, setTheme] = useState("light");

  const init = () => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored || "light");
    }
  };

  useEffect(() => {
    init();
    console.log("theme", theme);
    document.addEventListener("astro:after-swap", init);

    return () => document.removeEventListener("astro:after-swap", init);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <label className="swap swap-rotate btn btn-circle btn-ghost btn-primary btn-sm">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <div className="swap-on">
        <Sun size={18} />
      </div>
      <div className="swap-off">
        <Moon size={18} />
      </div>
    </label>
  );
}
