import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { ModalProvider } from '@/providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin | Bag Verse',
  description: 'Find Your Perfect Bag.',
};

function Header() {
  return (
    <header
      style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}
    >
      <h1>My App</h1>
      <SignedIn>
        {/* Show UserButton for signed-in users */}
        <UserButton afterSwitchSessionUrl="/" />
      </SignedIn>
      <SignedOut>
        {/* Show SignInButton for signed-out users */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
