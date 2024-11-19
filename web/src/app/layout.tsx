import './globals.css';
import { QueryClientWrapper } from '@/components/templates';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientWrapper>
        <body>{children}</body>
      </QueryClientWrapper>
    </html>
  );
}
