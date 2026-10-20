import site from "@/content/site.json";
import home from "@/content/home.json";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhoWeHelp from "@/components/WhoWeHelp";
import Approach from "@/components/Approach";
import Statement from "@/components/Statement";
import Process from "@/components/Process";
import Values from "@/components/Values";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.contact.email,
  slogan: site.tagline,
  description: site.seo.description,

};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header site={site} />
      <main id="main">
        <Hero content={home.hero} />
        <Marquee items={home.marquee} />
        <WhoWeHelp content={home.whoWeHelp} />
        <Approach content={home.approach} />
        <Statement content={home.statement} />
        <Process content={home.process} />
        <Values content={home.values} />
        <Team content={home.team} />
        <Contact content={home.contact} contact={site.contact} />
      </main>
      <Footer site={site} />
      <Motion />
    </>
  );
}
