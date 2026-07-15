import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Masthead } from "@/components/ui/Masthead";

export const metadata: Metadata = {
  title: "Lab",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <section className="container-max relative flex min-h-[100svh] flex-col overflow-hidden px-(--section-px) py-(--section-py)">
      <GridBackdrop />

      <div className="relative">
        <Masthead fig="—" name="LAB" view="IN PROGRESS" sheet="— / 8" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <Eyebrow className="mb-6 justify-center">Yapım Aşamasında</Eyebrow>

        <p className="text-display font-display font-bold text-text-primary">YAKINDA</p>

        <p className="text-body mx-auto mt-6 max-w-md text-text-secondary">
          Burası zamanla dolduracağım yeni bir bölüm için ayrılmış boş bir alan.
        </p>

        <div className="mt-10 flex justify-center">
          <Button href="/" variant="primary">
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </section>
  );
}
