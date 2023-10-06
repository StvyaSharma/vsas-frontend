import '@/styles/globals.css';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {

  const [themeMode, setThemeMode] = useState('light'); // Default to light mode

  // Function to toggle the theme mode
  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);

    // Update the meta theme color based on the mode
    const themeColor = newMode === 'light' ? '#c9eaf7' : '#000000';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
  };

  // Check if the user has a preference for dark mode
  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      setThemeMode('dark');
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
    }
  }, []);
  return <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"></link>
    <meta name="theme-color" content="#c9eaf7" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
    <Component {...pageProps} />
  </>
}
