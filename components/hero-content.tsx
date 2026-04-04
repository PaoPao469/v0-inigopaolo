const TEXT = "INIGO PAOLO"
const FONT_STYLE = {
  fontFamily: "var(--font-chillax), sans-serif",
  fontWeight: 500,
  fontSize: "34px",
  letterSpacing: "0.28em",
  lineHeight: 1,
  margin: 0,
}

export default function HeroContent() {
  return (
    <main 
      className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="relative flex items-center justify-center select-none">
        <h1
          className="relative"
          style={{
            ...FONT_STYLE,
            color: "#FFFFFF",
          }}
        >
          {TEXT}
        </h1>
      </div>
    </main>
  )
}
