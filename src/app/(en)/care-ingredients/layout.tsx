import { PillarAmbient } from "@/components/landing/pillar-ambient";

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PillarAmbient pillar="learn" />
      <div className="relative z-10">{children}</div>
    </>
  );
}
