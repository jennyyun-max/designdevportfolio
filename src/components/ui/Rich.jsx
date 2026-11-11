/* Renders *words* in a string as italic-serif accents: "Hi, I'm *Chloe*" */
export default function Rich({ text }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part
  );
}
