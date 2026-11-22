import type { CSSProperties } from "react";

/* ==================================================================
   THE HAND-DRAWN STRIP — three memories on one long strip of paper:
   California (x 0–1000), Korea (1000–2000), Michigan (2000–3000).
   Pencil outlines + colored-pencil hatching; a displacement filter
   makes every line slightly uneven.

   `a` (animated) adds the intro's CSS animation classes (see
   timeline.ts). Without it, every part shows its drawn state — for the
   Michigan scene that is the last frame, so the homepage print matches.
   ================================================================== */

const INK = "#4a3934";
const SKIN = "#f7dbc8";
const CHEEK = "#ee98a1";
const HAIR = "#3d2b26";
const SHIRT = "#fffaf1";
const JEANS = "#9fb3cb";
const BAG = "#e8a0ad";
const BAG_DK = "#c27583";
const JACKET = "#d4909d"; // dusty pink
const BOOT = "#f4e9da";
const SKIRT = "#5c4842";
const MAIZE = "#efc54f";
const BLUE = "#2e4a7d";

type A = { a: boolean; id: string };
const k = (a: boolean, name: string) => (a ? `ik-${name}` : undefined);

/* Colored pencil: a light wash plus hatching on top */
function Fill({ d, color, id, wash = 0.5, hatch = 0.85 }: { d: string; color: string; id: string; wash?: number; hatch?: number }) {
  return (
    <>
      <path d={d} fill={color} opacity={wash} />
      <path d={d} fill={color} opacity={hatch} mask={`url(#${id}-hatch)`} />
    </>
  );
}

/* A shape colored in, then outlined in pencil */
function Shape({ d, color, id, w = 3, wash, hatch }: { d: string; color: string; id: string; w?: number; wash?: number; hatch?: number }) {
  return (
    <>
      <Fill d={d} color={color} id={id} wash={wash} hatch={hatch} />
      <path d={d} fill="none" stroke={INK} strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" />
    </>
  );
}

/* Arms and legs: a pencil-outlined tube */
function Limb({ d, color, w = 13 }: { d: string; color: string; w?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth={w + 5.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Pencil({ d, w = 3, color = INK, o, len }: { d: string; w?: number; color?: string; o?: number; len?: boolean }) {
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" opacity={o} pathLength={len ? 1 : undefined} />
  );
}

/* Handwritten place name, “written” left to right */
function Place({ id, a, name, x, y, r, size = 64, cls }: A & { name: string; x: number; y: number; r: number; size?: number; cls: string }) {
  const clip = `${id}-clip-${name}`;
  return (
    <g transform={`rotate(${r} ${x} ${y})`}>
      <clipPath id={clip}>
        <rect className={k(a, cls)} x={x - 6} y={y - size} width={size * 4.2} height={size * 1.4} style={{ transformBox: "fill-box", transformOrigin: "0 50%" }} />
      </clipPath>
      <text x={x} y={y} clipPath={`url(#${clip})`} fill={INK} fontSize={size} fontWeight={600} style={{ fontFamily: "var(--font-caveat), cursive" }}>
        {name}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------
   THE GIRL — the same face, hair, side lock and little pink bag in
   every scene. Coordinates: feet at (0,0), hips at y −160, head
   centre (4,−318). Each figure is placed with a nested <svg> so its
   animation pivots stay in these local coordinates.
   ------------------------------------------------------------------ */
function Head({ id, a, scene, face = "open" }: A & { scene: "ca" | "kr" | "mi"; face?: "open" | "mi" }) {
  return (
    <>
      <g className={k(a, `${scene}-hair`)}>
        <Shape
          id={id}
          color={HAIR}
          d="M -46 -300 C -60 -350 -36 -378 4 -378 C 46 -378 64 -352 58 -304 C 62 -270 58 -240 54 -222 L 34 -228 C 38 -250 36 -270 34 -286 L -26 -286 C -30 -266 -34 -244 -40 -222 L -58 -228 C -54 -252 -48 -276 -46 -300 Z"
          wash={0.75}
        />
      </g>
      <Shape id={id} color={SKIN} d="M 4 -362 C 32 -362 47 -342 47 -316 C 47 -290 30 -270 4 -270 C -22 -270 -39 -290 -39 -316 C -39 -342 -24 -362 4 -362 Z" wash={0.85} hatch={0.5} />
      <path d="M 45 -324 C 55 -326 57 -308 46 -304" fill={SKIN} stroke={INK} strokeWidth={2.5} />
      {/* rosy cheeks */}
      <ellipse cx={-21} cy={-293} rx={10} ry={6.5} fill={CHEEK} opacity={0.55} mask={`url(#${id}-hatch)`} />
      <ellipse cx={31} cy={-293} rx={10} ry={6.5} fill={CHEEK} opacity={0.55} mask={`url(#${id}-hatch)`} />
      <ellipse cx={-21} cy={-293} rx={9} ry={5.5} fill={CHEEK} opacity={0.35} />
      <ellipse cx={31} cy={-293} rx={9} ry={5.5} fill={CHEEK} opacity={0.35} />
      {/* brows, nose */}
      <Pencil d="M -18 -326 Q -12 -329 -6 -326 M 14 -326 Q 20 -329 26 -326" w={2.2} />
      <Pencil d="M 6 -301 q 3 4 -1 6" w={2} />
      {face === "open" ? (
        <>
          <g className={scene === "kr" ? k(a, "kr-eye") : undefined}>
            <Eyes />
          </g>
          {scene === "kr" && (
            <g className={k(a, "kr-wink")} opacity={a ? undefined : 0}>
              <ellipse cx={-12} cy={-310} rx={4.5} ry={6} fill={INK} />
              <Pencil d="M 15 -309 Q 20 -304 25 -309" w={2.6} />
            </g>
          )}
          <Smile />
        </>
      ) : (
        <>
          {/* before the button works: open eyes, small mouth (hidden in the finished drawing) */}
          <g className={k(a, "mi-before")} opacity={0}>
            <Eyes />
            <Pencil d="M 0 -284 Q 6 -281 12 -284" w={2.4} />
          </g>
          {/* after: happy eyes and a big smile */}
          <g className={k(a, "mi-after")}>
            <Pencil d="M -17 -308 Q -12 -315 -7 -308 M 15 -308 Q 20 -315 25 -308" w={2.8} />
            <path d="M -3 -288 Q 6 -273 16 -288 Q 6 -284 -3 -288 Z" fill="#c76674" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          </g>
        </>
      )}
      {/* fringe */}
      <Shape
        id={id}
        color={HAIR}
        d="M -43 -322 C -40 -362 -12 -372 8 -370 C 34 -370 50 -354 49 -326 C 42 -338 32 -344 24 -336 C 18 -350 4 -350 -6 -338 C -14 -350 -32 -344 -43 -322 Z"
        wash={0.75}
      />
      {/* the side lock that blows, gets tucked, flips and falls forward */}
      <g className={k(a, `${scene}-lock`)}>
        <Shape id={id} color={HAIR} d="M 30 -362 C 48 -348 52 -318 48 -276 C 47 -264 43 -254 38 -248 C 40 -272 38 -316 24 -352 Z" w={2.5} wash={0.8} />
      </g>
      {/* neck */}
      <path d="M -6 -273 L -6 -258 L 12 -258 L 12 -273" fill={SKIN} stroke={INK} strokeWidth={2.5} />
    </>
  );
}

function Eyes() {
  return (
    <>
      <ellipse cx={-12} cy={-310} rx={4.5} ry={6} fill={INK} />
      <ellipse cx={20} cy={-310} rx={4.5} ry={6} fill={INK} />
      <circle cx={-10.5} cy={-312.5} r={1.6} fill="#fff" />
      <circle cx={21.5} cy={-312.5} r={1.6} fill="#fff" />
    </>
  );
}

function Smile() {
  return <path d="M -1 -286 Q 6 -278 14 -286" fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />;
}

function Tee({ id }: { id: string }) {
  return (
    <>
      <Shape id={id} color={SHIRT} d="M -40 -258 C -22 -266 28 -266 46 -258 L 54 -222 L 40 -218 L 38 -164 C 14 -158 -8 -158 -34 -164 L -34 -218 L -48 -222 Z" wash={0.9} hatch={0.3} />
      <Pencil d="M -8 -262 C -2 -252 10 -252 16 -262" w={2.2} />
      {/* a tiny pink heart on the tee */}
      <path d="M -18 -230 c -3 -5 -10 -1 -6 4 l 6 5 l 6 -5 c 4 -5 -3 -9 -6 -4 z" fill={BAG} stroke={INK} strokeWidth={1.4} />
    </>
  );
}

function Bag({ id, strap = true, strapClass, a }: { id: string; strap?: boolean; strapClass?: string; a: boolean }) {
  return (
    <>
      {strap && (
        <g className={strapClass ? k(a, strapClass) : undefined}>
          <Pencil d="M 40 -258 L -34 -176" w={3.5} color={BAG_DK} />
        </g>
      )}
      <Shape id={id} color={BAG} d="M -56 -180 h 30 q 7 0 7 7 v 18 q 0 7 -7 7 h -30 q -7 0 -7 -7 v -18 q 0 -7 7 -7 Z" wash={0.75} />
      <Pencil d="M -63 -168 Q -41 -156 -19 -168" w={2.2} />
      <circle cx={-41} cy={-161} r={2.6} fill={BAG_DK} />
    </>
  );
}

function Sneakers() {
  return (
    <>
      <path d="M -32 -2 C -32 -16 -6 -18 -2 -6 L -2 0 L -32 0 Z" fill="#fff" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M 6 -6 C 8 -18 36 -16 38 -2 L 38 0 L 6 0 Z" fill="#fff" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <Pencil d="M -31 -1 L -3 -1 M 7 -1 L 37 -1" w={2.4} color={BAG_DK} />
    </>
  );
}

/* California: sitting on the curb (hips on the curb at y −150, feet down in the street) */
function SittingGirl({ id, a }: A) {
  return (
    <>
      {/* the bag waits on the curb, then she picks it up */}
      <g className={k(a, "ca-bag")}>
        <Bag id={id} a={a} strapClass="ca-strap" />
      </g>
      <Limb d="M -6 -150 L 58 -178 L 64 -66" color={JEANS} w={24} />
      <Limb d="M 14 -150 L 78 -184 L 90 -68" color={JEANS} w={24} />
      <g transform="translate(58 -64)">
        <path d="M -14 -2 C -14 -14 10 -16 16 -4 L 16 2 L -14 2 Z" fill="#fff" stroke={INK} strokeWidth={2.6} />
      </g>
      <g transform="translate(86 -66)">
        <path d="M -14 -2 C -14 -14 10 -16 16 -4 L 16 2 L -14 2 Z" fill="#fff" stroke={INK} strokeWidth={2.6} />
      </g>
      <Limb d="M -42 -246 L -50 -200 L -56 -158" color={SKIN} w={12} />
      <Tee id={id} />
      <Head id={id} a={a} scene="ca" />
      {/* right arm: resting on her knee, then raised to tuck her hair behind her ear */}
      <g className={k(a, "ca-rest-arm")}>
        <Limb d="M 46 -246 L 60 -206 L 72 -188" color={SKIN} w={12} />
      </g>
      <g className={k(a, "ca-tuck-arm")} opacity={a ? undefined : 0}>
        <Limb d="M 46 -246 L 84 -278 L 54 -316" color={SKIN} w={12} />
      </g>
    </>
  );
}

/* Walking from California to Korea, bag on */
function WalkingGirl({ id, a }: A) {
  return (
    <>
      <g className={k(a, "swing-l")}>
        <Limb d="M -42 -246 L -48 -162" color={SKIN} w={12} />
      </g>
      <g className={k(a, "walk-l")}>
        <Limb d="M -14 -150 L -16 -14" color={JEANS} w={24} />
        <path d="M -32 -2 C -32 -16 -6 -18 -2 -6 L -2 0 L -32 0 Z" fill="#fff" stroke={INK} strokeWidth={2.6} />
      </g>
      <g className={k(a, "walk-r")}>
        <Limb d="M 16 -150 L 18 -14" color={JEANS} w={24} />
        <path d="M 6 -6 C 8 -18 36 -16 38 -2 L 38 0 L 6 0 Z" fill="#fff" stroke={INK} strokeWidth={2.6} />
      </g>
      <Shape id={id} color={JEANS} d="M -34 -166 L 38 -166 L 40 -146 L -36 -146 Z" />
      <Tee id={id} />
      <Bag id={id} a={a} />
      <Head id={id} a={a} scene="ca" />
      <g className={k(a, "swing-r")}>
        <Limb d="M 46 -246 L 52 -162" color={SKIN} w={12} />
      </g>
    </>
  );
}

/* Korea: pink performance jacket, boots, mic */
function StageGirl({ id, a }: A) {
  return (
    <>
      <Limb d="M -12 -140 L -14 -76" color={SKIN} w={20} />
      <Limb d="M -14 -78 L -16 -10" color={BOOT} w={24} />
      <path d="M -34 -2 C -34 -14 -8 -16 -2 -4 L -2 0 L -34 0 Z" fill={BOOT} stroke={INK} strokeWidth={2.6} />
      <g className={k(a, "kr-step")}>
        <Limb d="M 16 -140 L 20 -76" color={SKIN} w={20} />
        <Limb d="M 20 -78 L 24 -10" color={BOOT} w={24} />
        <path d="M 10 -4 C 12 -16 40 -14 42 -2 L 42 0 L 10 0 Z" fill={BOOT} stroke={INK} strokeWidth={2.6} />
      </g>
      <g className={k(a, "kr-pop")}>
        <Shape id={id} color={SKIRT} d="M -36 -174 L 40 -174 L 52 -136 L -48 -136 Z" wash={0.7} />
        <Pencil d="M -18 -172 L -24 -138 M 2 -172 L 2 -138 M 22 -172 L 28 -138" w={1.8} o={0.7} />
        {/* arms down while she dances… */}
        <g className={k(a, "kr-down")} opacity={a ? undefined : 0}>
          <Limb d="M -44 -250 L -54 -206 L -52 -166" color={JACKET} w={15} />
          <Limb d="M 50 -250 L 60 -206 L 56 -168" color={JACKET} w={15} />
          <circle cx={56} cy={-164} r={7} fill={SKIN} stroke={INK} strokeWidth={2.4} />
          <Pencil d="M 57 -166 L 60 -196" w={6} />
          <circle cx={61} cy={-202} r={8} fill="#8a7a74" stroke={INK} strokeWidth={2.4} />
        </g>
        <Shape id={id} color={JACKET} d="M -44 -260 C -24 -270 30 -270 50 -260 L 60 -214 L 46 -208 L 46 -170 C 16 -164 -10 -164 -40 -170 L -40 -208 L -54 -214 Z" wash={0.65} />
        <path d="M -6 -263 L 4 -232 L 14 -263 Z" fill={SHIRT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
        <Pencil d="M 4 -232 L 4 -172" w={2} />
        <Bag id={id} a={a} />
        <g className={k(a, "kr-head")}>
          <Head id={id} a={a} scene="kr" />
        </g>
        {/* …then the pose: hand on hip, mic up */}
        <g className={k(a, "kr-pose")}>
          <Limb d="M -44 -250 L -74 -212 L -40 -180" color={JACKET} w={15} />
          <Limb d="M 50 -250 L 82 -222 L 46 -248" color={JACKET} w={15} />
          <circle cx={42} cy={-250} r={7} fill={SKIN} stroke={INK} strokeWidth={2.4} />
          <Pencil d="M 42 -250 L 32 -266" w={6} />
          <circle cx={29} cy={-272} r={8} fill="#8a7a74" stroke={INK} strokeWidth={2.4} />
        </g>
      </g>
    </>
  );
}

/* Michigan: sitting in the library chair (hips on the seat) */
function DeskGirl({ id, a }: A) {
  return (
    <>
      <Limb d="M -6 -150 L 62 -160 L 70 -40" color={JEANS} w={24} />
      <Limb d="M 14 -150 L 82 -164 L 92 -42" color={JEANS} w={24} />
      <g transform="translate(66 -38)">
        <path d="M -14 -2 C -14 -14 10 -16 18 -4 L 18 2 L -14 2 Z" fill="#fff" stroke={INK} strokeWidth={2.6} />
      </g>
      <g transform="translate(90 -40)">
        <path d="M -14 -2 C -14 -14 10 -16 18 -4 L 18 2 L -14 2 Z" fill="#fff" stroke={INK} strokeWidth={2.6} />
      </g>
      {/* she leans in over the laptop (drawn upright, leaned by the wrapper) */}
      <g transform="rotate(10 0 -160)">
        <g className={k(a, "mi-lean")}>
          <Limb d="M -42 -246 L -46 -196 L -20 -176" color={SKIN} w={12} />
          <Tee id={id} />
          <g transform="rotate(4 32 -360)">
            <Head id={id} a={a} scene="mi" face="mi" />
          </g>
        </g>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------
   SCENES (each in its own 1000 × 1000 frame)
   ------------------------------------------------------------------ */
function California({ id, a }: A) {
  return (
    <svg x={0} y={0} width={1000} height={1000} overflow="visible">
      {/* the ocean, glittering behind the promenade */}
      <g filter={`url(#${id}-wobble)`}>
        <Fill id={id} d="M -40 560 C 200 552 420 566 640 556 S 900 552 1040 560 L 1040 700 L -40 700 Z" color="#cadded" wash={0.55} hatch={0.7} />
        <Pencil d="M -40 560 C 200 552 420 566 640 556 S 900 552 1040 560" w={2.4} />
        <g className={k(a, "waves")}>
          <Pencil d="M 60 600 q 16 -10 32 0 t 32 0 M 470 590 q 16 -10 32 0 t 32 0 M 760 612 q 16 -10 32 0 t 32 0 M 240 640 q 16 -10 32 0 t 32 0 M 620 652 q 16 -10 32 0 t 32 0 M 880 668 q 16 -10 32 0" w={2} color="#6f8fb3" />
        </g>
        <g className={k(a, "gulls")}>
          <Pencil d="M 520 430 q 10 -12 20 0 q 10 -12 20 0 M 590 470 q 8 -9 16 0 q 8 -9 16 0" w={2.2} />
        </g>
      </g>
      <g filter={`url(#${id}-wobble)`}>
        {/* sun */}
        <g className={k(a, "draw-ca")} strokeDasharray={a ? 1 : undefined}>
          <Fill id={id} d="M 660 322 a 38 38 0 1 0 0.1 0 Z" color="#f3cf86" />
          <Pencil d="M 660 322 a 38 38 0 1 0 0.1 0 Z" w={2.5} len />
          <Pencil d="M 660 302 l 0 -16 M 700 340 l 14 0 M 688 314 l 10 -10 M 632 314 l -10 -10 M 620 340 l -14 0" w={2.4} len />
          {/* palm trunk */}
          <Fill id={id} d="M 326 700 C 336 580 352 440 374 304 L 392 306 C 372 440 360 580 352 700 Z" color="#caa17a" />
          <Pencil d="M 326 700 C 336 580 352 440 374 304 M 352 700 C 360 580 372 440 392 306" w={3} len />
          <Pencil d="M 332 640 q 10 4 22 0 M 338 580 q 10 4 21 0 M 343 520 q 10 4 21 0 M 350 460 q 10 4 21 0 M 357 400 q 10 4 21 0 M 366 345 q 9 4 19 0" w={2} len />
          {/* curb */}
          <Pencil d="M 110 728 C 400 731 700 726 1010 729" w={2.6} len />
          <Pencil d="M 110 800 C 380 796 700 803 1010 798" w={1.8} o={0.55} len />
          <Pencil d="M 230 700 l 0 28 M 560 700 l 0 28 M 870 700 l 0 28" w={2} len />
          <Pencil d="M 180 690 q 6 -14 4 -2 q 6 -12 6 2 M 760 690 q 6 -14 4 -2 q 6 -12 6 2 M 640 690 q 5 -12 3 -1" w={2} color="#7f9a6c" len />
        </g>
        {/* palm fronds, swaying in the breeze */}
        <g className={k(a, "fronds")}>
          {[
            "M 382 302 C 330 262 282 270 246 300 C 292 292 330 296 382 302 Z",
            "M 382 302 C 352 244 312 222 270 226 C 316 244 344 268 382 302 Z",
            "M 382 302 C 394 240 424 214 470 212 C 430 236 404 266 382 302 Z",
            "M 382 302 C 436 268 482 274 512 304 C 470 296 430 296 382 302 Z",
            "M 382 302 C 430 312 460 340 470 384 C 444 348 416 330 382 302 Z",
            "M 382 302 C 336 318 306 346 296 392 C 324 352 350 332 382 302 Z",
          ].map((d) => (
            <Shape key={d} id={id} d={d} color="#93b083" w={2.6} />
          ))}
          <circle cx={384} cy={306} r={7} fill="#a07d5c" stroke={INK} strokeWidth={2} />
        </g>
      </g>
      <Place id={id} a={a} cls="write-ca" name="california" x={500} y={258} r={-6} size={64} />
      <svg x={500} y={850} overflow="visible" className={k(a, "ca-sit")} filter={`url(#${id}-wobble)`}>
        <SittingGirl id={id} a={a} />
      </svg>
      <g className={k(a, "walker")} opacity={a ? undefined : 0}>
        <svg x={500} y={700} overflow="visible" filter={`url(#${id}-wobble)`}>
          <WalkingGirl id={id} a={a} />
        </svg>
      </g>
    </svg>
  );
}

function Korea({ id, a }: A) {
  const lights = [130, 245, 360, 470, 590, 700, 815];
  return (
    <svg x={1000} y={0} width={1000} height={1000} overflow="visible">
      <g filter={`url(#${id}-wobble)`}>
        <g className={k(a, "draw-kr")} strokeDasharray={a ? 1 : undefined}>
          {/* curtain */}
          <Fill id={id} d="M 40 196 L 960 196 L 960 236 C 900 266 860 236 820 262 C 780 236 740 266 700 240 C 660 266 620 236 580 262 C 540 236 500 266 460 240 C 420 266 380 236 340 262 C 300 236 260 266 220 240 C 180 266 140 236 100 262 C 80 248 60 248 40 240 Z" color={JACKET} wash={0.35} hatch={0.55} />
          <Pencil d="M 40 236 C 80 248 100 262 100 262 C 140 236 180 266 220 240 C 260 266 300 236 340 262 C 380 236 420 266 460 240 C 500 266 540 236 580 262 C 620 236 660 266 700 240 C 740 266 780 236 820 262 C 860 236 900 266 960 236" w={2.6} len />
          {/* the Seoul skyline and N Seoul Tower behind the outdoor stage */}
          <Pencil d="M 40 700 L 40 560 L 110 560 L 110 520 L 170 520 L 170 590 L 230 590 L 230 540 L 290 540 L 290 700 M 760 700 L 760 600 L 820 600 L 820 548 L 880 548 L 880 610 L 960 610 L 960 700" w={2.2} o={0.7} len />
          <Pencil d="M 60 580 l 0 12 M 84 580 l 0 12 M 128 540 l 0 12 M 150 540 l 0 12 M 250 560 l 0 12 M 270 560 l 0 12 M 840 570 l 0 12 M 860 570 l 0 12 M 900 630 l 0 12" w={2} o={0.55} len />
          <Pencil d="M 690 700 L 698 452 M 712 700 L 704 452 M 686 452 L 716 452 L 722 430 L 680 430 Z M 701 430 L 701 360 M 694 520 L 708 520" w={2.4} len />
        </g>
        {/* spotlights, sweeping */}
        <g className={k(a, "spot-l")}>
          <Fill id={id} d="M 300 196 L 420 700 L 560 700 L 330 196 Z" color={MAIZE} wash={0.12} hatch={0.3} />
        </g>
        <g className={k(a, "spot-r")}>
          <Fill id={id} d="M 700 196 L 580 700 L 440 700 L 670 196 Z" color={JACKET} wash={0.12} hatch={0.3} />
        </g>
        <g className={k(a, "draw-kr")} strokeDasharray={a ? 1 : undefined}>
          {/* stage front */}
          <Pencil d="M 0 752 C 300 755 700 749 1000 752" w={2.6} len />
          <Pencil d="M 140 702 l -6 50 M 330 702 l -3 50 M 520 702 l 0 50 M 710 702 l 3 50 M 880 702 l 6 50" w={1.8} o={0.6} len />
          {/* sparkles */}
          <Pencil d="M 250 330 l 0 24 M 238 342 l 24 0 M 780 300 l 0 20 M 770 310 l 20 0 M 840 420 l 0 16 M 832 428 l 16 0" w={2.2} len />
        </g>
      </g>
      <Place id={id} a={a} cls="write-kr" name="seoul" x={286} y={652} r={-5} size={64} />
      {/* music notes and little stars floating up */}
      <g className={k(a, "notes")} filter={`url(#${id}-wobble)`}>
        {[
          [330, 420, "#ddd4ef"],
          [620, 380, "#f2c4c0"],
          [410, 330, "#f6e4a8"],
          [600, 470, "#ddd4ef"],
        ].map(([x, y, c]) => (
          <g key={`${x}`} transform={`translate(${x} ${y})`}>
            <Pencil d="M 8 0 L 8 -30 L 26 -36 L 26 -8" w={2.6} />
            <ellipse cx={3} cy={1} rx={7} ry={5.5} fill={c as string} stroke={INK} strokeWidth={2.4} />
            <ellipse cx={21} cy={-7} rx={7} ry={5.5} fill={c as string} stroke={INK} strokeWidth={2.4} />
          </g>
        ))}
        {[
          [280, 300],
          [720, 330],
          [520, 250],
        ].map(([x, y]) => (
          <path
            key={`s${x}`}
            d={`M ${x} ${y - 16} L ${x + 5} ${y - 5} L ${x + 17} ${y - 4} L ${x + 8} ${y + 4} L ${x + 11} ${y + 16} L ${x} ${y + 9} L ${x - 11} ${y + 16} L ${x - 8} ${y + 4} L ${x - 17} ${y - 4} L ${x - 5} ${y - 5} Z`}
            fill={MAIZE}
            stroke={INK}
            strokeWidth={2.2}
            strokeLinejoin="round"
          />
        ))}
      </g>
      <g className={k(a, "kr")}>
        <svg x={500} y={700} overflow="visible" filter={`url(#${id}-wobble)`}>
          <StageGirl id={id} a={a} />
        </svg>
      </g>
      {/* the audience and their little lights */}
      <g filter={`url(#${id}-wobble)`}>
        {lights.map((x, i) => (
          <g key={x}>
            <Fill id={id} d={`M ${x - 40} 816 C ${x - 40} 776 ${x + 40} 776 ${x + 40} 816 Z`} color={INK} wash={0.18} hatch={0.35} />
            <Pencil d={`M ${x - 40} 816 C ${x - 40} 776 ${x + 40} 776 ${x + 40} 816`} w={2.2} />
            <Pencil d={`M ${x + 26} 790 L ${x + 34} 752`} w={3} />
            <g className={k(a, `l${(i % 4) + 1}`)}>
              <circle cx={x + 35} cy={746} r={12} fill={i % 3 === 1 ? MAIZE : "#f08ea0"} opacity={0.35} />
              <circle cx={x + 35} cy={746} r={6} fill={i % 3 === 1 ? MAIZE : "#f08ea0"} stroke={INK} strokeWidth={1.6} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* The laptop screen: code on the left, the little interface she’s designing on the right */
function Screen({ id, a }: A) {
  const code: [number, number, number, string][] = [
    [462, 478, 40, BLUE],
    [472, 492, 46, INK],
    [472, 506, 30, "#c76674"],
    [482, 520, 34, MAIZE],
    [472, 534, 42, INK],
    [462, 548, 24, BLUE],
  ];
  return (
    <>
      <Shape id={id} color="#fffdf8" d="M 450 452 L 614 462 L 614 590 L 450 594 Z" w={3} wash={1} hatch={0} />
      <Pencil d="M 532 458 L 532 590" w={1.6} o={0.5} />
      <g className={k(a, "mi-code")} strokeDasharray={a ? 1 : undefined}>
        {code.map(([x, y, w, c]) => (
          <Pencil key={y} d={`M ${x} ${y} l ${w} 1`} w={4} color={c} len />
        ))}
      </g>
      {/* the interface */}
      <Shape id={id} color="#fff" d="M 542 474 L 604 478 L 604 580 L 542 582 Z" w={2} wash={1} hatch={0} />
      <Shape id={id} color={BLUE} d="M 542 474 L 604 478 L 604 488 L 542 485 Z" w={2} wash={0.8} />
      <Shape id={id} color={MAIZE} d="M 548 494 L 598 496 L 598 520 L 548 520 Z" w={1.8} wash={0.5} />
      <Pencil d="M 549 528 l 40 0 M 549 536 l 28 0" w={2.2} o={0.6} />
      {/* the button she draws, taps — and it works */}
      <path className={k(a, "mi-fill")} d="M 556 548 h 36 q 6 0 6 6 v 6 q 0 6 -6 6 h -36 q -6 0 -6 -6 v -6 q 0 -6 6 -6 Z" fill={MAIZE} />
      <g className={k(a, "mi-button")} strokeDasharray={a ? 1 : undefined}>
        <path d="M 556 548 h 36 q 6 0 6 6 v 6 q 0 6 -6 6 h -36 q -6 0 -6 -6 v -6 q 0 -6 6 -6 Z" fill="none" stroke={BLUE} strokeWidth={2.6} pathLength={1} />
      </g>
      <g className={k(a, "mi-spark")}>
        <Pencil d="M 574 538 l 0 -12 M 592 542 l 9 -9 M 556 542 l -9 -9 M 604 556 l 10 0" w={2.2} color={BLUE} />
      </g>
    </>
  );
}

function Michigan({ id, a }: A) {
  const books = [MAIZE, BLUE, "#e8a0ad", "#9fb3cb", BLUE, MAIZE, "#93b083"];
  return (
    <svg x={2000} y={0} width={1000} height={1000} overflow="visible">
      <g filter={`url(#${id}-wobble)`}>
        <g className={k(a, "draw-mi")} strokeDasharray={a ? 1 : undefined}>
          {/* arched library window */}
          <Fill id={id} d="M 292 420 L 292 300 C 292 250 340 224 340 224 C 340 224 388 250 388 300 L 388 420 Z" color="#cfe0ee" wash={0.4} hatch={0.5} />
          <Pencil d="M 292 420 L 292 300 C 292 250 340 224 340 224 C 340 224 388 250 388 300 L 388 420 Z M 340 226 L 340 420 M 292 330 L 388 330" w={2.6} len />
          {/* bookshelf */}
          <Pencil d="M 628 220 L 730 220 L 730 440 L 628 440 Z M 628 293 L 730 293 M 628 366 L 730 366" w={2.6} len />
          {/* desk */}
          <Pencil d="M 432 606 L 430 830 M 716 606 L 720 830 M 412 618 L 734 616" w={3} len />
          {/* chair (Michigan blue) */}
          <Pencil d="M 298 520 L 304 660 M 306 668 L 304 830 M 396 668 L 404 830" w={3} len />
        </g>
        {/* design sketches pinned to the wall: a wireframe (UX) and a little chart (data) */}
        <g transform="rotate(-4 480 316)">
          <Shape id={id} color="#fffdf8" d="M 436 262 L 524 262 L 524 368 L 436 368 Z" w={2.2} wash={1} hatch={0} />
          <Pencil d="M 446 274 L 514 274 L 514 290 L 446 290 Z M 446 300 L 476 300 L 476 330 L 446 330 Z M 484 302 L 514 302 M 484 312 L 508 312 M 484 322 L 512 322 M 450 344 L 510 344 L 510 356 L 450 356 Z" w={1.6} />
          <rect x={470} y={255} width={22} height={11} fill="#f2c4c0" opacity={0.85} />
        </g>
        <g transform="rotate(5 572 322)">
          <Shape id={id} color="#fffdf8" d="M 534 276 L 610 276 L 610 368 L 534 368 Z" w={2.2} wash={1} hatch={0} />
          <Pencil d="M 544 356 L 600 356 M 544 286 L 544 356" w={1.6} />
          <Shape id={id} color={MAIZE} d="M 552 330 L 562 330 L 562 356 L 552 356 Z" w={1.4} wash={0.8} />
          <Shape id={id} color={BLUE} d="M 568 312 L 578 312 L 578 356 L 568 356 Z" w={1.4} wash={0.7} />
          <Shape id={id} color="#e8a0ad" d="M 584 296 L 594 296 L 594 356 L 584 356 Z" w={1.4} wash={0.8} />
          <circle cx={572} cy={276} r={5} fill="#c9736b" stroke={INK} strokeWidth={1.6} />
        </g>
        {books.map((c, i) => (
          <Shape key={i} id={id} color={c} d={`M ${636 + i * 13} ${i % 3 === 1 ? 236 : 230} l 10 0 l 0 ${i % 3 === 1 ? 56 : 62} l -10 0 Z`} w={1.8} wash={0.6} />
        ))}
        {books.slice(0, 6).map((c, i) => (
          <Shape key={`b${i}`} id={id} color={books[(i + 3) % 7]} d={`M ${640 + i * 14} ${i % 2 ? 306 : 302} l 11 0 l 0 ${i % 2 ? 58 : 62} l -11 0 Z`} w={1.8} wash={0.6} />
        ))}
        <Shape id={id} color={BLUE} d="M 294 512 C 300 504 312 504 316 512 L 318 664 L 300 666 Z" wash={0.6} />
        <Shape id={id} color={BLUE} d="M 296 656 L 410 652 L 412 672 L 300 676 Z" wash={0.6} />
        {/* her little pink bag, hung on the chair */}
        <Pencil d="M 304 520 C 286 540 284 568 290 584" w={3} color={BAG_DK} />
        <Shape id={id} color={BAG} d="M 270 584 h 30 q 7 0 7 7 v 18 q 0 7 -7 7 h -30 q -7 0 -7 -7 v -18 q 0 -7 7 -7 Z" wash={0.75} />
        <Pencil d="M 263 596 Q 285 608 307 596" w={2.2} />
        <circle cx={285} cy={603} r={2.6} fill={BAG_DK} />
        {/* desk top, mug, lamp */}
        <Shape id={id} color="#d9b48a" d="M 410 600 L 736 598 L 736 618 L 410 620 Z" wash={0.55} />
        <Shape id={id} color={BLUE} d="M 628 566 L 652 566 L 650 598 L 630 598 Z" wash={0.7} />
        <Pencil d="M 629 576 L 651 576" w={4} color={MAIZE} />
        <Pencil d="M 652 574 q 10 2 0 14" w={2.4} />
        <Pencil d="M 696 598 L 696 520 L 680 506" w={3} />
        <Shape id={id} color={MAIZE} d="M 660 516 L 700 500 L 712 520 L 672 534 Z" wash={0.7} />
        <Shape id={id} color="#c9b8a8" d="M 682 598 L 712 598 L 710 590 L 684 590 Z" w={2} />
        {/* laptop */}
        <Shape id={id} color="#cfc6bd" d="M 438 600 L 626 600 L 618 590 L 446 592 Z" w={2.6} wash={0.6} />
        <Screen id={id} a={a} />
      </g>
      <Place id={id} a={a} cls="write-mi" name="ann arbor" x={452} y={710} r={-3} size={62} />
      <g className={k(a, "mi")}>
        <svg x={350} y={805} overflow="visible" filter={`url(#${id}-wobble)`}>
          <DeskGirl id={id} a={a} />
        </svg>
      </g>
      {/* her arm with the stylus, reaching for the screen */}
      <g className={k(a, "mi-arm")} filter={`url(#${id}-wobble)`}>
        <Limb d="M 410 568 L 466 596 L 548 576" color={SKIN} w={12} />
        <circle cx={550} cy={576} r={7.5} fill={SKIN} stroke={INK} strokeWidth={2.4} />
        <Pencil d="M 548 580 L 572 557" w={4.5} />
        <Pencil d="M 570 559 L 573 556" w={4.5} color="#e8a0ad" />
      </g>
    </svg>
  );
}

/* Paper texture, hatching and the pencil wobble */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-wobble`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <pattern id={`${id}-hatch-p`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
        <rect width="3.2" height="7" fill="#fff" />
      </pattern>
      <mask id={`${id}-hatch`} maskUnits="userSpaceOnUse" x="-400" y="-400" width="4000" height="1800">
        <rect x="-400" y="-400" width="4000" height="1800" fill={`url(#${id}-hatch-p)`} />
      </mask>
    </defs>
  );
}

/* The paper strip itself, with slightly torn edges */
const PAPER =
  "M -200 96 C 200 84 500 104 900 92 S 1600 100 2000 90 S 2700 102 3200 92 L 3200 912 C 2800 902 2400 918 2000 908 S 1200 916 800 906 S 100 918 -200 908 Z";
/* One pencil line running the whole strip: the curb, then the stage edge, then up into the desk */
const LINE = "M 110 700 C 400 703 700 698 1000 701 S 1700 698 1990 700 C 2120 702 2240 690 2300 664 C 2340 646 2380 622 2410 620";

function Strip({ id, a, region }: A & { region: "all" | "michigan" | "california" | "seoul" }) {
  return (
    <>
      <Defs id={id} />
      <path d={PAPER} fill="#f7efe1" />
      <path d={PAPER} fill="none" stroke="#e3d5bf" strokeWidth={2} />
      <g filter={`url(#${id}-wobble)`}>
        <path className={k(a, "line")} d={LINE} fill="none" stroke={INK} strokeWidth={3.2} strokeLinecap="round" pathLength={1} strokeDasharray={a ? 1 : undefined} />
      </g>
      {(region === "all" || region === "california") && <California id={id} a={a} />}
      {(region === "all" || region === "seoul") && <Korea id={id} a={a} />}
      {(region === "all" || region === "michigan") && <Michigan id={id} a={a} />}
    </>
  );
}

/** The whole animated strip (the camera moves it; see IntroStory) */
export function IntroStrip({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-200 0 3400 1000" className={className} style={style} aria-hidden="true" focusable="false">
      <Strip id="intro" a region="all" />
    </svg>
  );
}

/** The finished Michigan drawing — exactly the intro's last frame — for the homepage print */
export function MichiganSketch({ id = "mi-print" }: { id?: string }) {
  return (
    <svg viewBox="2180 210 640 640" className="block h-full w-full" aria-hidden="true" focusable="false">
      <Strip id={id} a={false} region="michigan" />
    </svg>
  );
}

const SCENE_VIEW = {
  california: "140 160 780 780",
  seoul: "1150 170 760 760",
  michigan: "2180 210 640 640",
} as const;

/** One finished scene as a still drawing (the Journey storybook pages) */
export function SceneSketch({ scene, label }: { scene: keyof typeof SCENE_VIEW; label: string }) {
  return (
    <svg viewBox={SCENE_VIEW[scene]} className="block h-full w-full" role="img" aria-label={label} focusable="false">
      <Strip id={`scene-${scene}`} a={false} region={scene} />
    </svg>
  );
}
