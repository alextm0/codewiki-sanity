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

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  // Set the theme to light on mount
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  return null; // No button or interface, as we are forcing light mode
};

export default ThemeSwitcher;
