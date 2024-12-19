"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 클라이언트 측에서만 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-gray-200 text-gray-800">로딩 중...</div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" dark: text-gray-800 dark:text-gray-200"
    >
      {theme === "dark" ? "☀️" : "🌑"}
    </button>
  );
};

export default ThemeToggle;
