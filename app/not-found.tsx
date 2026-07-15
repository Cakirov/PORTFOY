import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";

export default function NotFound() {
  return (
    <section className="container-max relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-(--section-px) text-center">
      <GridBackdrop />

      <div className="relative">
        <Eyebrow className="mb-6 justify-center">Sayfa Bulunamadı</Eyebrow>

        <p className="text-display font-display font-bold text-text-primary">404</p>

        <p className="text-body mx-auto mt-6 max-w-md text-text-secondary">
          Aradığın sayfa taşınmış veya hiç var olmamış olabilir.
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
