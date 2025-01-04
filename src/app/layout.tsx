// app/layout.tsx
import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
