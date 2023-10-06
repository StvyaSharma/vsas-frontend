import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from './components/navbar'
import { useEffect, useState } from 'react';

export default function Document() {

  return (
    <Html lang="en"  >
      <Head />
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
    </Html>
  )
}
