import { Header } from "@/components/ui/root";
import { Footer } from "@/components/ui/root";

export default async function PublicNavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
