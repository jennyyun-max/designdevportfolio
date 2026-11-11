"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero } from "@/content/site";
import Container from "../ui/Container";
import ButtonLink from "../ui/ButtonLink";
import InteractivePotato from "../ui/InteractivePotato";
import { Sparkle } from "../ui/Potato";
import PolaroidGallery from "../polaroids/PolaroidGallery";
import { polaroids } from "@/content/polaroids";

const ease = [0.22, 1, 0.36, 1] as const;

/* "hi, i’m *chloe*!" — words rise in one by one; *word* becomes the accent */
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 id="hero-heading" className="display text-[clamp(3.6rem,12vw,8.75rem)] leading-[0.9]">
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const accent = /\*(.+)\*/.exec(word);
          return (
            <span key={i} className={`inline-block overflow-hidden pb-[0.12em] align-bottom ${i < words.length - 1 ? "mr-[0.24em]" : ""}`}>
              <motion.span
                className="relative inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
              >
                {accent ? (
                  <>
                    {word.slice(0, accent.index)}
                    <em className="relative">
                      {accent[1]}
                      <svg viewBox="0 0 300 24" className="absolute bottom-[0.1em] left-0 w-full" aria-hidden="true" focusable="false">
                        <motion.path
                          d="M4 16 C 60 6, 120 22, 180 12 S 270 6, 296 14"
                          fill="none"
                          stroke="var(--rose)"
                          strokeWidth="5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.9, ease }}
                        />
                      </svg>
                    </em>
                    {word.slice(accent.index + accent[0].length)}
                  </>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          );
        })}
      </span>
    </h1>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-x-clip">
      <Container className="grid items-end gap-12 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1fr_minmax(26rem,32rem)] lg:gap-10 lg:pb-24">
        <div>
          <motion.p
            className="eyebrow flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkle className="twinkle h-3.5 w-3.5" />
            {hero.eyebrow}
          </motion.p>
          <div className="mt-6">
            <AnimatedHeadline text={hero.headline} />
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
            <p className="mt-8 max-w-[36rem] text-[clamp(1.15rem,2vw,1.4rem)] leading-relaxed text-espresso-soft">{hero.text}</p>
            {hero.status && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-[8px] bg-sage px-3 py-1.5 text-sm font-medium">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-espresso opacity-40 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-espresso" />
                </span>
                {hero.status}
              </p>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#work" variant="primary" icon={<ArrowDown size={16} aria-hidden="true" />}>
                explore my work
              </ButtonLink>
              <ButtonLink href="#about" icon={<ArrowUpRight size={16} aria-hidden="true" />}>
                get to know me
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        {/* Polaroid desk: photos drop in on load; the potato lives here too */}
        <motion.div className="relative w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <PolaroidGallery photos={polaroids} className="h-[21rem] sm:h-[25rem] lg:h-[34rem]">
            <InteractivePotato
              className="absolute bottom-0 left-1 z-[5] w-14 lg:bottom-1 lg:left-auto lg:right-2 lg:w-20"
              bubbleClassName="left-0 lg:left-auto lg:right-0"
            />
            <Sparkle className="twinkle absolute right-3 top-[44%] z-[5] w-5 lg:hidden" color="var(--espresso)" />
          </PolaroidGallery>
        </motion.div>
      </Container>
    </section>
  );
}
