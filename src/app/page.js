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
        <Work />
        <Publications />
        <About />
        <Experience />
        <Contact />
      </main>
      <CommandPalette />
      <ClientEffects />
    </>
  );
}
