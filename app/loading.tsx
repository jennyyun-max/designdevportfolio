import Potato from "@/components/ui/Potato";

/* A cute loading state while a room loads */
export default function Loading() {
  return (
    <div className="grid min-h-[60svh] place-items-center" role="status" aria-live="polite">
      <div className="text-center">
        <span className="potato-idle mx-auto block w-16">
          <Potato className="block w-full" />
        </span>
        <p className="hand mt-3 text-[1.5rem] text-espresso-soft">opening the next page…</p>
      </div>
    </div>
  );
}
