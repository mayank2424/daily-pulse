import type { Metadata } from 'next'
import './globals.css'
import { Inter } from "next/font/google"
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = {
  title: 'Daily Pulse',
  description: 'Habit Tracking App',
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
