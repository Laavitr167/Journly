import { Cormorant_Garamond } from 'next/font/google';
import { Open_Sans } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});

export const openSans = Open_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});