import { PillarAmbient } from "@/components/landing/pillar-ambient";

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PillarAmbient pillar="foods" />
      <div className="relative z-10">{children}</div>
    </>
  );
}
