"use client";

/**
 * Official Raksha Bandhan background scene illustration image.
 * Uses official asset from Theme BG directory: /assets/festivals/rakhi-bg-scene.png
 */
export function RakhiImageBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{
        maskImage: "radial-gradient(circle at 50% 45%, black 55%, transparent 95%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 55%, transparent 95%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/festivals/rakhi-bg-scene.png"
        alt="Raksha Bandhan Celebration"
        className="w-full h-full object-cover object-[center_35%] sm:object-[center_40%] md:object-center opacity-[0.08] sm:opacity-[0.07] mix-blend-multiply transition-all duration-300 pointer-events-none select-none"
      />
    </div>
  );
}

/**
 * Official Ganpati Bappa Darshan background scene illustration image.
 * Uses official asset from Theme BG directory: /assets/festivals/ganpati-bg-scene.png
 */
export function GanpatiImageBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{
        maskImage: "radial-gradient(circle at 50% 45%, black 55%, transparent 95%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 55%, transparent 95%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/festivals/ganpati-bg-scene.png"
        alt="Ganpati Bappa Darshan"
        className="w-full h-full object-cover object-[center_35%] sm:object-[center_40%] md:object-center opacity-[0.08] sm:opacity-[0.07] mix-blend-multiply transition-all duration-300 pointer-events-none select-none"
      />
    </div>
  );
}

export function FaintRakhiBackground() {
  return <RakhiImageBackground />;
}

export function FaintGanpatiBackground() {
  return <GanpatiImageBackground />;
}
