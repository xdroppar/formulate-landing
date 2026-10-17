"use client";

import { useSyncExternalStore } from "react";

/**
 * Is this an iPhone/iPad?
 *
 * FALSE on the server and during hydration, then the real answer. The server
 * has no user agent, so deciding this during render would produce different
 * HTML on the server and the client and React would throw a hydration mismatch
 * on every one of these pages. The web path is therefore what search engines
 * and the first paint see; iOS visitors get the store swapped in a tick later.
 * (`getServerSnapshot` is what gives that, without a setState in an effect.)
 */
export function useIsIOS(): boolean {
  return useSyncExternalStore(subscribe, detectIOS, () => false);
}

// The user agent never changes while the page is open: nothing to subscribe to.
const subscribe = () => () => {};

function detectIOS(): boolean {
  const ua = navigator.userAgent || "";
  // iPadOS 13+ reports itself as a Mac; the touch-point check separates a
  // real iPad from a desktop Safari, which would otherwise be sent to a
  // store it cannot install from.
  const iPadOS = /Mac/.test(ua) && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/i.test(ua) || iPadOS;
}
