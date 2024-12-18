"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
    >
      {theme === "dark" ? "☀️" : "🌑"}
    </button>
  );
};

export default ThemeToggle;
