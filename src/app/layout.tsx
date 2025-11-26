import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UH Connect - Gaming Social Network',
  description: 'Connect with UH gamers and build your gaming community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classString = `${inter.className} wrapper`;
  return (
    <html lang="en">
      <body className={classString}>
        <Providers>
          <NavBar />
          <div className="main-content">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
