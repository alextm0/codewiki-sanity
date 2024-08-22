// 'use client';

// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';

// const ThemeSwitcher = () => {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   setTheme('light');

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <button
//       onClick={() => setTheme(theme === 'light' ? 'light' : 'light')}
//       className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
//     >
//       {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
//     </button>
//   );
// };

// export default ThemeSwitcher;

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-background text-primary rounded"
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeSwitcher;

