import { forwardRef } from "react";
import { FileGlyph } from "./Icons.jsx";

const toneBar = {
  marigold: "bg-marigold",
  sage: "bg-sage",
  peach: "bg-peach",
  lilac: "bg-lilac",
  butter: "bg-butter",
  sky: "bg-sky",
  plain: "bg-window",
};

/* A window: title bar (file name + optional close) and a body.
   Used for static panels, floating desktop windows, and cards. */
const Window = forwardRef(function Window(
  {
    title,
    titleId,
    tone = "plain",
    onClose,
    titleBarProps = {},
    className = "",
    bodyClassName = "p-5 sm:p-6",
    as: Tag = "div",
    children,
    ...rest
  },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`flex flex-col overflow-hidden rounded-[var(--radius-window)] border border-ink bg-window shadow-[var(--shadow-window)] ${className}`}
      {...rest}
    >
      <div
        className={`flex h-9 shrink-0 select-none items-center justify-between gap-3 border-b border-ink pl-3 pr-1 ${toneBar[tone] ?? toneBar.plain}`}
        {...titleBarProps}
      >
        <span id={titleId} className="flex min-w-0 items-center gap-2 font-mono text-[0.8125rem] leading-none">
          <FileGlyph className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{title}</span>
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="grid h-7 w-7 place-items-center rounded-[var(--radius-sm)] font-mono text-base leading-none hover:bg-ink hover:text-window"
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </Tag>
  );
});

export default Window;
