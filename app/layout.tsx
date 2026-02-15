import type { Metadata } from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "文案收集处",
  description: "由lnpbqc设计、收集、维护的文案网站。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-full overflow-y-auto">
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              {children}
          </ThemeProvider>
          <Toaster></Toaster>
      </body>
    </html>
  );
}
