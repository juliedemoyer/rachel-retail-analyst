import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Rust-on-cream "R" mark, matches the brand palette in app/theme.css.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#f5efe6",
          color: "#a85432",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
