"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navigationEntry && navigationEntry.type === "reload";

    if (isReload && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return null;
}
