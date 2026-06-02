'use client';

import { useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLElement | null>(null);
  return ref;
}
