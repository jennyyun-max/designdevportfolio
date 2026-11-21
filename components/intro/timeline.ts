/* ==================================================================
   INTRO TIMELINE — every moving part of the hand-drawn intro, in
   seconds. All parts share one clock (D), so the CSS can start at
   first paint, before any JavaScript loads.
   ================================================================== */

/** Story length incl. the pull-back into the Polaroid (the slide onto the homepage follows) */
export const D = 4.4;

type Frame = [t: number, css: string, ease?: string];

const pct = (t: number) => `${((Math.min(Math.max(t, 0), D) / D) * 100).toFixed(3)}%`;

function kf(name: string, frames: Frame[]) {
  const f = [...frames];
  if (f[0][0] > 0) f.unshift([0, f[0][1]]);
  if (f[f.length - 1][0] < D) f.push([D, f[f.length - 1][1]]);
  const body = f.map(([t, css, ease]) => `${pct(t)}{${css}${ease ? `;animation-timing-function:${ease}` : ""}}`).join("");
  return `@keyframes k-${name}{${body}}.ik-${name}{animation:k-${name} ${D}s linear both}`;
}

/* Rotation/scale about a pivot, always the same function list so keyframes interpolate cleanly */
const tf = ({ x = 0, y = 0, r = 0, s = 1, px = 0, py = 0 }) =>
  `transform:translate(${x}px,${y}px) translate(${px}px,${py}px) rotate(${r}deg) scale(${s}) translate(${-px}px,${-py}px)`;
const op = (o: number) => `opacity:${o}`;
const draw = (o: number) => `stroke-dashoffset:${o}`;
const write = (s: number) => `transform:scaleX(${s})`;

const OUT = "cubic-bezier(0.22,1,0.36,1)";
const INOUT = "cubic-bezier(0.65,0,0.35,1)";
const POP = "cubic-bezier(0.3,1.6,0.6,1)";

/* Camera: (cx, cy) in strip units is kept at the centre of the frame; 1 unit = 0.1cqmax (“slice” fit) */
const cam = (cx: number, cy: number, s: number) =>
  `transform:translate(calc(50cqw - ${(((cx + 200) / 10) * s).toFixed(3)}cqmax),calc(50cqh - ${((cy / 10) * s).toFixed(3)}cqmax)) scale(${s})`;

/* Walking: legs and arms swing on a beat while she crosses from California to Korea */
function walk(from: number, to: number, beats: number, amp: number, pivot: { px: number; py: number }, phase: 1 | -1): Frame[] {
  const f: Frame[] = [[from - 0.01, tf({ ...pivot })]];
  for (let i = 0; i <= beats; i++) f.push([from + ((to - from) * i) / beats, tf({ ...pivot, r: (i % 2 ? -1 : 1) * amp * phase }), "ease-in-out"]);
  f.push([to + 0.06, tf({ ...pivot })]);
  return f;
}

const blink = (name: string, offset: number) =>
  kf(name, [
    [2.2 + offset, op(0.25)],
    [2.3 + offset, op(1)],
    [2.38 + offset, op(0.35)],
    [2.46 + offset, op(1)],
    [2.56 + offset, op(0.5)],
    [2.66 + offset, op(1)],
  ]);

const SHOULDER_R = { px: 46, py: -246 };
const SHOULDER_L = { px: -42, py: -246 };
const NECK = { px: 4, py: -262 };
const HIP = { px: 0, py: -160 };
const LOCK = { px: 32, py: -360 };
const CROWN = { px: 4, py: -378 };
const KR_HIP = { px: 500, py: 540 }; // her hips, in the Korea frame

export const introCss = [
  // ---- camera + the frame shrinking into a Polaroid ----
  kf("cam", [
    [0, cam(510, 590, 1.5), INOUT],
    [0.9, cam(500, 500, 1)],
    [1.0, cam(500, 500, 1), INOUT],
    [1.55, cam(1500, 540, 1.1)],
    [2.48, cam(1500, 540, 1.1), INOUT],
    [2.95, cam(2470, 540, 1.1)],
    [3.9, cam(2470, 540, 1.1), "cubic-bezier(0.6,0,0.2,1)"],
    // pulls back with the frame: the last view is the square the homepage print shows (MICHIGAN_VIEW)
    [4.4, cam(2500, 530, 1000 / 640)],
  ]),
  kf("skip", [
    [3.82, "opacity:1;visibility:visible"],
    [3.92, "opacity:0;visibility:hidden"],
  ]),
  kf("card", [
    [3.9, "width:100vw;height:100svh", "cubic-bezier(0.6,0,0.2,1)"],
    [4.4, "width:var(--pw);height:calc(var(--pw) * 1.139)"],
  ]),
  kf("paper", [
    [3.9, "padding:0 0 0 0;box-shadow:0 0 0 rgba(58,38,32,0)", "cubic-bezier(0.6,0,0.2,1)"],
    [4.4, "padding:calc(var(--pw) * 0.05) calc(var(--pw) * 0.05) 0;box-shadow:0 2px 4px rgba(58,38,32,0.1),0 24px 40px -16px rgba(58,38,32,0.32)"],
  ]),
  kf("cap", [
    [3.9, "height:0", "cubic-bezier(0.6,0,0.2,1)"],
    [4.4, "height:calc(var(--pw) * 0.189)"],
  ]),
  // the pencil line that runs the length of the strip: curb → stage edge → desk
  kf("line", [
    [0, draw(0.84)],
    [0.9, draw(0.64), "ease-in-out"],
    [1.55, draw(0.36), "ease-in-out"],
    [2.5, draw(0.28), "ease-in-out"],
    [2.95, draw(0)],
  ]),

  // ---- 1. California ----
  kf("draw-ca", [
    [0, draw(1), OUT],
    [0.45, draw(0)],
  ]),
  kf("write-ca", [
    [0.42, write(0)],
    [0.85, write(1)],
  ]),
  kf("fronds", [
    [0.05, tf({ px: 380, py: 300 }), "ease-in-out"],
    [0.25, tf({ px: 380, py: 300, r: -5 }), "ease-in-out"],
    [0.45, tf({ px: 380, py: 300, r: 4 }), "ease-in-out"],
    [0.7, tf({ px: 380, py: 300, r: -2 }), "ease-in-out"],
    [1.0, tf({ px: 380, py: 300, r: 1 }), "ease-in-out"],
    [1.3, tf({ px: 380, py: 300 })],
  ]),
  kf("ca-hair", [
    [0.1, tf(CROWN), "ease-in-out"],
    [0.3, tf({ ...CROWN, r: -6 }), "ease-in-out"],
    [0.55, tf({ ...CROWN, r: -2 }), "ease-in-out"],
    [0.7, tf(CROWN)],
  ]),
  kf("ca-lock", [
    [0.1, tf(LOCK), OUT],
    [0.3, tf({ ...LOCK, r: -40 }), "ease-in-out"],
    [0.45, tf({ ...LOCK, r: -32 }), "ease-in-out"],
    [0.62, tf({ ...LOCK, r: -26 })],
  ]),
  kf("ca-rest-arm", [
    [0.44, op(1)],
    [0.48, op(0)],
    [0.64, op(0)],
    [0.68, op(1)],
  ]),
  kf("ca-tuck-arm", [
    [0.42, `${op(0)};${tf({ ...SHOULDER_R, r: 35 })}`, OUT],
    [0.5, `${op(1)};${tf({ ...SHOULDER_R, r: 4 })}`],
    [0.6, `${op(1)};${tf(SHOULDER_R)}`],
    [0.66, `${op(0)};${tf({ ...SHOULDER_R, r: 25 })}`],
  ]),
  kf("ca-bag", [
    [0.78, tf({ x: -54, y: 2 }), POP],
    [0.98, tf({})],
  ]),
  kf("ca-strap", [
    [0.9, op(0)],
    [0.98, op(1)],
  ]),
  kf("ca-sit", [
    [1.0, op(1)],
    [1.05, op(0)],
  ]),
  kf("walker", [
    [0.99, `${op(0)};${tf({ y: 30 })}`],
    [1.06, `${op(1)};${tf({ x: 30 })}`],
    [1.54, `${op(1)};${tf({ x: 930 })}`],
    [1.62, `${op(0)};${tf({ x: 980 })}`],
  ]),
  kf("walk-l", walk(1.06, 1.6, 6, 18, { px: -14, py: -150 }, 1)),
  kf("walk-r", walk(1.06, 1.6, 6, 18, { px: 16, py: -150 }, -1)),
  kf("swing-l", walk(1.06, 1.6, 6, 14, SHOULDER_L, -1)),
  kf("swing-r", walk(1.06, 1.6, 6, 14, SHOULDER_R, 1)),

  // ---- 2. Korea ----
  kf("draw-kr", [
    [1.1, draw(1), OUT],
    [1.55, draw(0)],
  ]),
  kf("write-kr", [
    [1.68, write(0)],
    [2.05, write(1)],
  ]),
  kf("kr", [
    [1.52, `${op(0)};${tf({ x: -60, ...KR_HIP })}`],
    [1.62, `${op(1)};${tf({ x: -40, ...KR_HIP })}`, OUT],
    [1.8, `${op(1)};${tf(KR_HIP)}`],
    [2.5, `${op(1)};${tf(KR_HIP)}`, "ease-in"],
    [2.68, `${op(0)};${tf({ x: 150, r: 8, ...KR_HIP })}`],
  ]),
  kf("kr-step", [
    [1.62, tf({ px: 16, py: -150, r: -22 }), OUT],
    [1.8, tf({ px: 16, py: -150 })],
  ]),
  kf("kr-pop", [
    [1.82, tf(HIP), "ease-out"],
    [1.88, tf({ ...HIP, y: -9, r: -5 }), "ease-in"],
    [1.96, tf(HIP), "ease-out"],
    [2.0, tf({ ...HIP, y: -4, r: -2 }), "ease-in"],
    [2.04, tf(HIP)],
  ]),
  kf("kr-head", [
    [2.04, tf(NECK), "ease-out"],
    [2.14, tf({ ...NECK, r: -14 }), "ease-in-out"],
    [2.26, tf({ ...NECK, r: 10 }), OUT],
    [2.4, tf({ ...NECK, r: 6 })],
  ]),
  kf("kr-lock", [
    [2.04, tf(LOCK), "ease-out"],
    [2.14, tf({ ...LOCK, r: -60 }), "ease-in-out"],
    [2.28, tf({ ...LOCK, r: 14 }), OUT],
    [2.42, tf({ ...LOCK, r: -6 })],
  ]),
  kf("kr-hair", [
    [2.04, tf(CROWN), "ease-out"],
    [2.14, tf({ ...CROWN, r: 9 }), "ease-in-out"],
    [2.28, tf({ ...CROWN, r: -8 }), OUT],
    [2.42, tf(CROWN)],
  ]),
  kf("kr-down", [
    [2.26, op(1)],
    [2.3, op(0)],
  ]),
  kf("kr-pose", [
    [2.26, `${op(0)};${tf({ ...SHOULDER_R, r: 20 })}`, OUT],
    [2.34, `${op(1)};${tf(SHOULDER_R)}`],
  ]),
  kf("kr-wink", [
    [2.3, op(0)],
    [2.34, op(1)],
  ]),
  kf("kr-eye", [
    [2.3, op(1)],
    [2.34, op(0)],
  ]),
  blink("l1", 0),
  blink("l2", 0.06),
  blink("l3", 0.11),
  blink("l4", 0.03),

  // ---- 3. Michigan (every part ends at its drawn state, so the still print matches the last frame) ----
  kf("draw-mi", [
    [2.25, draw(1), OUT],
    [2.75, draw(0)],
  ]),
  kf("write-mi", [
    [2.95, write(0)],
    [3.32, write(1)],
  ]),
  kf("mi", [
    [2.55, `${op(0)};${tf({ x: -170, y: -40, r: -12, px: 350, py: 645 })}`],
    [2.64, `${op(1)};${tf({ x: -140, y: -30, r: -10, px: 350, py: 645 })}`, OUT],
    [2.95, `${op(1)};${tf({ px: 350, py: 645 })}`],
  ]),
  kf("mi-lean", [
    [2.95, tf({ px: 350, py: 645, r: -10 }), OUT],
    [3.12, tf({ px: 350, py: 645 })],
  ]),
  kf("mi-lock", [
    [2.98, tf({ ...LOCK, r: -30 }), OUT],
    [3.2, tf(LOCK)],
  ]),
  kf("mi-code", [
    [2.9, draw(1), "ease-in-out"],
    [3.2, draw(0)],
  ]),
  kf("mi-arm", [
    [3.04, `${op(0)};${tf({ px: 410, py: 568, r: 55 })}`],
    [3.08, `${op(1)};${tf({ px: 410, py: 568, r: 50 })}`, OUT],
    [3.22, `${op(1)};${tf({ px: 410, py: 568, r: 0 })}`],
    [3.42, `${op(1)};${tf({ px: 410, py: 568 })}`, "ease-in"],
    [3.46, `${op(1)};${tf({ x: 5, y: -3, px: 410, py: 568 })}`, "ease-out"],
    [3.52, `${op(1)};${tf({ px: 410, py: 568 })}`],
  ]),
  kf("mi-button", [
    [3.2, draw(1), "ease-in-out"],
    [3.42, draw(0)],
  ]),
  kf("mi-fill", [
    [3.46, op(0)],
    [3.5, op(1)],
  ]),
  kf("mi-spark", [
    [3.48, `${op(0)};${tf({ px: 573, py: 556, s: 0.4 })}`, POP],
    [3.58, `${op(1)};${tf({ px: 573, py: 556 })}`],
  ]),
  kf("mi-before", [
    [3.54, op(1)],
    [3.6, op(0)],
  ]),
  kf("mi-after", [
    [3.54, op(0)],
    [3.6, op(1)],
  ]),
].join("\n");
