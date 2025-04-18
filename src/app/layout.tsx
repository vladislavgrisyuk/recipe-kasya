import SidebarLayout from "@/components/layout/SidebarLayout";
import "@/app/globals.css";

export const metadata = { title: "Моё приложение" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}
