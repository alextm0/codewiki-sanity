import React from 'react';
import Script from "next/script";

export default function HeadContent() {
  return (
    <head>
      <GoogleTagManagerScript />
      <FontPreloads />
      <ImagePreloads />
    </head>
  );
}

function GoogleTagManagerScript() {
  return (
    <Script
      id="gtm-head"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NCFGTGC');`,
      }}
    />
  );
}

function FontPreloads() {
  const fonts = [
    { href: "/fonts/Poppins-Regular.woff2", type: "font/woff2" },
    // Add other fonts here
  ];

  return (
    <>
      {fonts.map((font, index) => (
        <link
          key={index}
          rel="preload"
          href={font.href}
          as="font"
          type={font.type}
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
}

function ImagePreloads() {
  return (
    <link
      rel="preload"
      href="/assets/optimized-bg-pattern.png"
      as="image"
      type="image/png"
      crossOrigin="use-credentials"
    />
  );
}