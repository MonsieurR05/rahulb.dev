import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = "Rahul Bagga — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0a",
          color: "#ecebe6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#a6a59e",
          }}
        >
          <span>rahulb.dev</span>
          <span>London, UK</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 140,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 28,
              paddingTop: 28,
              borderTop: "2px solid #383835",
              fontSize: 38,
              color: "#a6a59e",
            }}
          >
            {profile.title}
          </div>
        </div>
      </div>
    ),
    size
  );
}
