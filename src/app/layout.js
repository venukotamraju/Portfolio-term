import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Venu Kotamraju",
  description: "Welcome to the personal web-page of venu kotamraju. You will find here his work, projects, contributions and his essence.",
  openGraph: {
    title: "Venu Kotamraju",
    description:"Personal Portfolio cum Web-page of Venu Kotamraju. You can find his contributions, work, projects and his essence.",
    images:[
      {
        url: '/venu_pic.png',
        width: 800,
        height: 600,
        alt: 'A preview image of venu kotamraju',
      },
    ],
    url:'https://venukotamraju.vercel.app',
  },
  twitter: {
    card: '/venu_pic_hero-min.png',
    title: "Venu Kotamraju's Portfolio",
    description: 'Know about Venu kotamraju\'s contributions, work, writings, research, blogs and his essence.',
    images:['/venu_pic.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
