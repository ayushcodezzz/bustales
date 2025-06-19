import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bus Tales - Premium Bus Photography & Stories | @bustales_",
  description: "Discover the fascinating world of buses through stunning photography, detailed specifications, and captivating journey stories. From Volvo coaches to local transport, explore Bus Tales on Instagram @bustales_",
  keywords: [
    "bus photography",
    "bus stories",
    "transport photography",
    "bus gallery",
    "bus videos",
    "Volvo buses",
    "Mercedes buses",
    "Tata buses",
    "Leyland buses",
    "bus specifications",
    "bus journey stories",
    "transportation photography",
    "bus enthusiasts",
    "bus collection",
    "bus heritage",
    "urban transportation",
    "bus design",
    "bus engineering",
    "bus culture",
    "bus documentation",
    "bustales",
    "bustales_",
    "bus photography india",
    "bus photography worldwide"
  ].join(", "),
  authors: [{ name: "Bus Tales Team" }],
  creator: "Bus Tales Team",
  publisher: "Bus Tales",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bustales.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Bus Tales - Premium Bus Photography & Stories",
    description: "Discover the fascinating world of buses through stunning photography, detailed specifications, and captivating journey stories. From Volvo coaches to local transport, explore Bus Tales on Instagram @bustales_",
    url: 'https://bustales.com',
    siteName: 'Bus Tales',
    images: [
      {
        url: '/images/bustales-logo-og.svg',
        width: 1200,
        height: 630,
        alt: 'Bus Tales - Premium Bus Photography & Stories',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bus Tales - Premium Bus Photography & Stories",
    description: "Discover the fascinating world of buses through stunning photography, detailed specifications, and captivating journey stories. From Volvo coaches to local transport, explore Bus Tales on Instagram @bustales_",
    images: ['/images/bustales-logo-og.svg'],
    creator: '@bustales_',
    site: '@bustales_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'photography',
  classification: 'bus photography and stories',
  other: {
    'theme-color': '#f59e0b',
    'color-scheme': 'light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Bus Tales',
    'application-name': 'Bus Tales',
    'msapplication-TileColor': '#f59e0b',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f59e0b" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <meta name="theme-color" content="#f59e0b" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
