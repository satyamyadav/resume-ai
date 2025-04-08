// app/layout.tsx
import './globals.css';
import { Roboto } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
// Configure the Roboto font
const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Resume Builder',
  description: 'Build your resume interactively using AI and LaTeX.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
          {children}
      </body>
    </html>
  );
}
