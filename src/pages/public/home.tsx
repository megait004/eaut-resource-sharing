import type { FC } from "react";
import HeroSection from "@/components/public/home/hero-section";
import FeaturesSection from "@/components/public/home/features-section";
import Bubble from "@/components/public/home/bubble";
import RepoInfo from "@/components/public/home/repo-info";
import ReccentDocuments from "@/components/public/home/reccent-documents";

const Home: FC = () => {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: `bubble-${i}`,
    size: Math.random() * 40 + 15,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    direction: Math.random() > 0.5 ? "left" : ("right" as "left" | "right"),
  }));

  return (
    <div
      className="position-relative overflow-hidden"
      style={{
        minHeight: "100vh",
      }}
    >
      <HeroSection />
      <ReccentDocuments />
      <FeaturesSection />
      <RepoInfo />
      <div
        className="position-fixed"
        style={{
          inset: 0,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            size={bubble.size}
            left={bubble.left}
            delay={bubble.delay}
            direction={bubble.direction}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
