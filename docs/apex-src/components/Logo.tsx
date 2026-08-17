/**
 * Apex logo — simple geometric placeholder mark (Logoipsum-style triangle/delta)
 * paired with the APEX wordmark. Works in monochrome; inherits currentColor.
 */
export default function Logo({
  variant = "full",
  className,
}: Readonly<{ variant?: "full" | "symbol"; className?: string }>) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55em",
        lineHeight: 1,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ flex: "none" }}
      >
        <path d="M12 3 22 21H2L12 3Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 10.5 17 19H7L12 10.5Z" fill="currentColor" />
      </svg>
      {variant === "full" && (
        <span
          style={{
            fontSize: "0.9375rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Apex
        </span>
      )}
    </span>
  );
}
