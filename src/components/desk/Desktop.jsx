import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { home, site } from "../../content.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import Container from "../Container.jsx";
import Window from "../ui/Window.jsx";
import Button from "../ui/Button.jsx";
import { CardIcon, DocIcon, FolderIcon, PhotoIcon, Sticker } from "../ui/Icons.jsx";
import Polaroid from "./Polaroid.jsx";
import StickyNote from "./StickyNote.jsx";
import { deskWindows } from "./deskWindows.jsx";

const DESK_HEIGHT = 650;
const ICON_COLUMN = 224; // width reserved for the icon grid on the right

function IntroWindow() {
  return (
    <Window title="hello.txt" titleId="hello-title" tone="marigold" bodyClassName="p-6 sm:p-8">
      <h1 className="font-heading text-[clamp(3rem,7vw,4.75rem)] leading-[0.95] tracking-[-0.01em]">
        {home.greeting}
      </h1>
      <p className="mt-5 max-w-[32rem] text-lg leading-relaxed">{home.intro}</p>
      {home.status && (
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink bg-sage px-3 py-1 font-mono text-xs">
          <span className="h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
          {home.status}
        </p>
      )}
      <div className="mt-7 flex flex-wrap gap-3">
        <Button href="#work" variant="primary">
          View projects <span aria-hidden="true">↓</span>
        </Button>
        <Button to="/about">About me</Button>
        {site.resume ? (
          <Button href={site.resume} target="_blank" rel="noreferrer">Resume</Button>
        ) : (
          <Button>Resume · coming soon</Button>
        )}
      </div>
    </Window>
  );
}

function IconGlyph({ icon, tone }) {
  const cls = "h-12 w-14";
  if (icon === "folder") return <FolderIcon tone={tone} className={cls} />;
  if (icon === "photo") return <PhotoIcon tone={tone} className={cls} />;
  if (icon === "card") return <CardIcon tone={tone} className={cls} />;
  return <DocIcon tone={tone} className={cls} />;
}

const iconClass =
  "group flex w-24 flex-col items-center gap-1.5 rounded-[var(--radius-sm)] p-2 text-center hover:bg-window/70";
const labelClass =
  "rounded-[var(--radius-sm)] px-1.5 py-0.5 font-mono text-xs leading-tight group-hover:bg-ink group-hover:text-window";

/* The desktop hero: intro window, labelled icons that open windows,
   and a few personal objects. Desktop-only window behavior; on smaller
   screens it becomes a simple stacked layout. */
export default function Desktop() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const deskRef = useRef(null);
  const [deskWidth, setDeskWidth] = useState(1088);

  const [openIds, setOpenIds] = useState([]); // last = front-most
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(deskWindows.map((w) => [w.id, { x: w.x, y: w.y }]))
  );
  const [focusId, setFocusId] = useState(null);
  const windowRefs = useRef({});
  const openerRefs = useRef({});
  const drag = useRef(null);

  useLayoutEffect(() => {
    if (!deskRef.current) return;
    const ro = new ResizeObserver(([entry]) => setDeskWidth(entry.contentRect.width));
    ro.observe(deskRef.current);
    return () => ro.disconnect();
  }, [isDesktop]);

  // Move keyboard focus into a window when it opens
  useEffect(() => {
    if (focusId) windowRefs.current[focusId]?.focus();
  }, [focusId]);

  // Close everything when switching to the stacked (small-screen) layout
  useEffect(() => {
    if (!isDesktop) setOpenIds([]);
  }, [isDesktop]);

  const bringToFront = (id) => setOpenIds((ids) => [...ids.filter((x) => x !== id), id]);

  const openWindow = (id, opener) => {
    openerRefs.current[id] = opener;
    bringToFront(id);
    setFocusId(null);
    requestAnimationFrame(() => setFocusId(id));
  };

  const closeWindow = (id) => {
    setOpenIds((ids) => ids.filter((x) => x !== id));
    setFocusId(null);
    openerRefs.current[id]?.focus();
  };

  // Keep windows on the desk and out of the icon column, so icons stay clickable
  const clamp = (id, x, y) => {
    const w = deskWindows.find((d) => d.id === id).width;
    return {
      x: Math.max(0, Math.min(x, deskWidth - ICON_COLUMN - w)),
      y: Math.max(0, Math.min(y, DESK_HEIGHT - 48)),
    };
  };

  // Optional dragging by the title bar (pointer only; buttons still work)
  const titleBarProps = (id) => ({
    onPointerDown: (e) => {
      if (e.button !== 0 || e.target.closest("button")) return;
      const pos = clamp(id, positions[id].x, positions[id].y);
      drag.current = { id, startX: e.clientX, startY: e.clientY, ...pos };
      e.currentTarget.setPointerCapture(e.pointerId);
      bringToFront(id);
    },
    onPointerMove: (e) => {
      const d = drag.current;
      if (!d || d.id !== id) return;
      const next = clamp(id, d.x + e.clientX - d.startX, d.y + e.clientY - d.startY);
      setPositions((p) => ({ ...p, [id]: next }));
    },
    onPointerUp: () => (drag.current = null),
    onPointerCancel: () => (drag.current = null),
    style: { cursor: "grab", touchAction: "none" },
  });

  const icons = [
    { id: "projects", label: "projects/", icon: "folder", tone: "marigold", href: "#work" },
    ...deskWindows.map((w) => ({ id: w.id, label: w.title, icon: w.icon, tone: w.tone })),
  ];

  if (!isDesktop) {
    return (
      <section aria-labelledby="hello-title" className="bg-dots border-b border-rule">
        <Container className="py-8 sm:py-12">
          <IntroWindow />
          <div className="mt-8 grid grid-cols-2 items-start gap-5 sm:grid-cols-[13rem_17rem] sm:gap-8">
            <Polaroid {...home.photo} tilt={-3} />
            <StickyNote tilt={2}>{home.note}</StickyNote>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section aria-labelledby="hello-title" className="bg-dots border-b border-rule">
      <Container>
        <div ref={deskRef} className="relative" style={{ height: DESK_HEIGHT }}>
          {/* Intro, with the sticky note tucked underneath it */}
          <div className="absolute left-0 top-12 flex w-[35rem] flex-col">
            <IntroWindow />
            <div className="relative ml-10 mt-6 flex items-start gap-6">
              <StickyNote tilt={-2} className="w-64">
                {home.note}
              </StickyNote>
              {home.stickers && <Sticker kind="chart" className="mt-10 w-12 rotate-[-8deg]" />}
            </div>
          </div>

          {/* Photo corner + stickers */}
          <div className="absolute left-[37.5rem] top-[17rem] w-44">
            <Polaroid {...home.photo} tilt={4} />
          </div>
          {home.stickers && (
            <>
              <Sticker kind="sparkle" className="absolute left-[33.5rem] top-7 w-10" />
              <Sticker kind="heart" className="absolute left-[46.5rem] top-[16rem] w-9 rotate-12" />
            </>
          )}

          {/* Icons */}
          <nav aria-label="Desktop" className="absolute right-0 top-14">
            <p className="mb-3 text-right font-mono text-xs text-muted">open the files on my desk</p>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
              {icons.map((item) => {
                const isOpen = openIds.includes(item.id);
                const content = (
                  <>
                    <IconGlyph icon={item.icon} tone={item.tone} />
                    <span className={`${labelClass} ${isOpen ? "bg-ink text-window" : ""}`}>{item.label}</span>
                  </>
                );
                return (
                  <li key={item.id}>
                    {item.href ? (
                      <a href={item.href} className={iconClass} aria-label={`${item.label} — jump to projects`}>
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className={iconClass}
                        aria-label={`${isOpen ? "Close" : "Open"} ${item.label}`}
                        aria-haspopup="dialog"
                        aria-expanded={isOpen}
                        onClick={(e) => (isOpen ? closeWindow(item.id) : openWindow(item.id, e.currentTarget))}
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Open windows — rendered in a fixed DOM order (so focus isn't lost
              when stacking changes); stacking comes from z-index. */}
          {deskWindows.filter((w) => openIds.includes(w.id)).map((w) => {
            const id = w.id;
            const pos = clamp(id, positions[id].x, positions[id].y);
            return (
              <Window
                key={id}
                ref={(el) => (windowRefs.current[id] = el)}
                role="dialog"
                aria-labelledby={`win-${id}-title`}
                tabIndex={-1}
                title={w.title}
                titleId={`win-${id}-title`}
                tone={w.tone}
                onClose={() => closeWindow(id)}
                titleBarProps={titleBarProps(id)}
                onMouseDown={() => bringToFront(id)}
                onFocus={() => openIds[openIds.length - 1] !== id && bringToFront(id)}
                onKeyDown={(e) => e.key === "Escape" && closeWindow(id)}
                className="absolute max-h-[34rem] outline-offset-4"
                style={{ left: pos.x, top: pos.y, width: w.width, zIndex: 20 + openIds.indexOf(id) }}
                bodyClassName="overflow-auto p-5"
              >
                <w.Content />
              </Window>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
