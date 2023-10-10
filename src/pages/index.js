import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './components/navbar';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the destination page after a short delay
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000); // Delay in milliseconds

    // Clear the timer on unmount to avoid memory leaks
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <>
      <Navbar />

      <main>

        <div>
          <p>Redirecting to Dashboard...</p>

        </div></main></>

  );
}
