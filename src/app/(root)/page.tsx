import Hero from "@/components/Hero";
import { SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex h-full bg-dark-primary w-full overflow-y-scroll p-8 ">
      <Hero/>
    </main>
  );
}
