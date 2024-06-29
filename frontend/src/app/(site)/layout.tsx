import Navbar from "@/components/site/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar />
      <main className="container mx-auto py-4 sm:py-6 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4">
        {children}
      </main>
    </div>
  );
}
