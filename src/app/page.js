import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Publications from "@/components/Publications";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import CommandPalette from "@/components/CommandPalette";
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Publications />
        <Contact />
      </main>
      <CommandPalette />
      <ClientEffects />
    </>
  );
}
