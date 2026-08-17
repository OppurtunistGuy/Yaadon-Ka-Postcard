"use client";

import { cn } from "@/lib/utils";

/**
 * Airmail-style red & blue diagonal striped border.
 * Wrap content; the border sits on the outer edge.
 */
export function AirmailBorder({
  children,
  className,
  thickness = "md",
}: {
  children?: React.ReactNode;
  className?: string;
  thickness?: "sm" | "md" | "lg";
}) {
  const pad =
    thickness === "lg" ? "p-3" : thickness === "sm" ? "p-1.5" : "p-2.5";
  return (
    <div className={cn("airmail-border rounded-md", pad, className)}>
      <div
        className="rounded-sm"
        style={{ backgroundColor: "var(--paper)" }}
      >
        {children}
      </div>
    </div>
  );
}

/** Thin airmail divider line */
export function AirmailDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("airmail-edge-thin h-2 w-full rounded-sm", className)}
    />
  );
}
