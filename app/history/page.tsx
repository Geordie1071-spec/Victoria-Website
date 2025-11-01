import { Navbar, History } from "@/components";
export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col mt-20">
        <History />
      </main>
    </>
  );
}
