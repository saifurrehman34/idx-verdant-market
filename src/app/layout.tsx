import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { cn } from "@/lib/utils";
import { createClient } from '@/lib/supabase/server';
import type { Category } from '@/types';
import type { User } from '@supabase/supabase-js';
import { PT_Sans } from 'next/font/google';
import { MainLayoutWrapper } from '@/components/main-layout-wrapper';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Verdant Market',
  description: 'Fresh and organic products delivered to you.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: categoriesData } = await supabase.from('categories').select('*').order('name');
  const categories: Category[] = categoriesData || [];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", ptSans.variable)}>
        <Providers>
            <MainLayoutWrapper categories={categories} user={user}>
              {children}
            </MainLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
