import type { StaticImageData } from "next/image";
import cosmicJourney from "@/public/images/art/recovery-01-cosmic-journey.jpg";
import strings from "@/public/images/art/recovery-02-strings.jpg";
import arrhythmias from "@/public/images/art/recovery-03-arrhythmias.jpg";
import hospitalBed from "@/public/images/art/recovery-04-hospital-bed.jpg";
import newBeginningIce from "@/public/images/art/recovery-05-new-beginning-ice.jpg";
import newBeginningShaving from "@/public/images/art/recovery-05-new-beginning-shaving.jpg";
import ivBags from "@/public/images/art/recovery-06-iv-bags.jpg";
import figure from "@/public/images/art/study-figure.jpg";
import stillLife from "@/public/images/art/study-still-life.jpg";
import selfPortrait from "@/public/images/art/study-self-portrait.jpg";
import perspective from "@/public/images/art/study-perspective.jpg";
import torso from "@/public/images/art/body-marshmallow-torso.jpg";
import torsoLying from "@/public/images/art/body-marshmallow-torso-lying.jpg";
import torsoDetail from "@/public/images/art/body-marshmallow-torso-detail.jpg";
import foodCollage from "@/public/images/art/body-photo-collage.jpg";
import foodFigures from "@/public/images/art/body-figures.jpg";

/* ==================================================================
   ART PORTFOLIO (/art) — the artwork photos from Chloe's portfolio PDF,
   extracted at their original resolution (files in /public/images/art).

   Titles and materials only where the PDF gives them; pieces without a
   title are shown by number. Captions are one sentence in Chloe's own
   words from the PDF. The PDF's planning notes are not used here.
   Body Image & Identity: selected pieces; captions stay on the art
   itself (materials, collage, composition).
   `more` = a detail shot or another view, shown next to the piece.
   ================================================================== */

export type ArtImage = { src: StaticImageData; alt: string; label?: string };
export type Artwork = {
  id: string;
  title?: string;
  materials?: string;
  caption?: string;
  image: ArtImage;
  more?: ArtImage[];
};
export type ArtSection = { id: string; title: string; note?: string; layout: "sequence" | "studies"; works: Artwork[] };

export const art: ArtSection[] = [
  {
    id: "recovery",
    title: "My Father’s Recovery",
    note: "Thanksgiving 2017, from the first hospital piece to the IV bags — in the order it happened.",
    layout: "sequence",
    works: [
      {
        id: "cosmic-journey",
        title: "Cosmic Journey",
        caption:
          "This piece introduces the “cosmic journey” my father went through during Thanksgiving 2017 — the shots are his medication, the money falling from the bones is how costly it was, and the pomegranate is his delicate body.",
        image: { src: cosmicJourney, alt: "Painting of syringes pointing at a heart among pomegranates and bones on a red ground" },
      },
      {
        id: "strings",
        materials: "String",
        caption:
          "How I felt watching my dad in the hospital bed with countless medications plugged into him — I exaggerated the strings to show my worry and my fear of losing him.",
        image: { src: strings, alt: "Painting of a hospital bed with strings stretched from IV bags across the piece" },
      },
      {
        id: "arrhythmias",
        title: "ah-RITH-me-ahs",
        materials: "Fabric, metal",
        caption: "The pacemaker in my dad’s heart: the fabrics show the softness of human flesh, and the metal pacemaker gives the contrast.",
        image: { src: arrhythmias, alt: "Collage of patterned fabrics with a drawn metal pacemaker at the centre" },
      },
      {
        id: "hospital-bed",
        materials: "Acrylics, pen, string, nail",
        caption: "The tension around the hospital bed while he was unconscious — people were trying to control his condition, but in the end it was God who saved my dad.",
        image: { src: hospitalBed, alt: "A hospital bed at the centre of radiating strings, with hands reaching in from every side" },
      },
      {
        id: "new-beginning",
        caption:
          "A new beginning: when my dad first woke up he felt stuck in ice, because he couldn’t move for 10 days — so I paired it with a portrait of him shaving, a fresh start.",
        image: { src: newBeginningIce, alt: "Iridescent painting of a betta fish frozen in a melting block of ice" },
        more: [{ src: newBeginningShaving, alt: "Iridescent portrait of Chloe’s father shaving", label: "Portrait of my dad shaving" }],
      },
      {
        id: "iv-bags",
        materials: "IV bags, everyday objects",
        caption:
          "My dad’s IV bags were full of medication, so I filled my own with what I need to live — like pepper flakes, because my Korean culture is very important to me.",
        image: { src: ivBags, alt: "Installation of hanging IV bags filled with pepper flakes, earbuds, pasta, a phone and other objects" },
      },
    ],
  },
  {
    id: "studies",
    title: "Observational Studies",
    layout: "studies",
    works: [
      { id: "figure", title: "Figure", image: { src: figure, alt: "Iridescent figure study of two people sitting" } },
      { id: "still-life", title: "Still life", image: { src: stillLife, alt: "Still life of glass bottles and wine glasses on a green ground" } },
      { id: "self-portrait", title: "Self portrait", image: { src: selfPortrait, alt: "Self-portrait in saturated pink and blue, with a disco ball and a globe" } },
      { id: "perspective", title: "Perspective Studies", image: { src: perspective, alt: "Perspective drawing of a stairwell with metal railings" } },
    ],
  },
  {
    id: "body-image",
    title: "Body Image & Identity",
    note: "In this series, I used collage and mixed media to explore how the images we see every day can shape the way we see ourselves.",
    layout: "sequence",
    works: [
      {
        id: "brainwashed",
        title: "Brainwashed by the media on ideal body type",
        materials: "Marshmallows, paper",
        caption: "I built the torso from marshmallows and wrinkled paper, so the “ideal” silhouette is covered in a soft, uneven, fragile surface.",
        image: { src: torso, alt: "White sculpture of a slim torso covered in wrinkled paper, against a dark blue wall" },
        more: [
          { src: torsoDetail, alt: "Black-and-white close-up of the torso covered in marshmallows", label: "Detail" },
          { src: torsoLying, alt: "The marshmallow torso lying on its side on pavement", label: "Another view" },
        ],
      },
      {
        id: "photo-collage",
        materials: "Photo collage",
        caption: "A photo collage fills the background, and the drawn figure in front sits on top of all those images.",
        image: { src: foodCollage, alt: "A crouching woman drawn over a dense photo collage" },
      },
      {
        id: "figures",
        image: { src: foodFigures, alt: "Five life-size human silhouettes filled with collaged images, with a person standing beside the first" },
      },
    ],
  },
];

/** The homepage preview */
export const artPreview = { image: { src: ivBags, alt: "Installation of hanging IV bags filled with everyday objects" } };
