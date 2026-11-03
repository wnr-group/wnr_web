import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <span className="label sheet__fig">FIG. 404</span>
        <h1 className="t-mega">
          This layer <span className="em">isn’t</span> built yet.
        </h1>
        <Button href="/" variant="ultra">
          Back to the core
        </Button>
      </div>
    </section>
  );
}
