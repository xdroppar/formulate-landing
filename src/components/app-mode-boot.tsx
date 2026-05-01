"use client";

/**
 * Toggles `<html class="app-mode">` when the page is embedded inside
 * the Formulate mobile app's WebView. Globals.css uses that class to
 * hide site nav / footer / newsletter blocks so guides read as native
 * articles in-app.
 *
 * Detection (any one is sufficient):
 *   1. URL has `?app=1`
 *   2. localStorage has `formulate:app-mode === '1'`  (sticky after first hit)
 *   3. navigator.userAgent contains `FormulateMobile`  (mobile WebView sets this)
 *
 * Persisting via localStorage means client-side navigations inside the
 * embedded WebView (e.g. guide → related guide) keep app mode without
 * the mobile app needing to rewrite every link.
 */

import { useEffect } from "react";

const STORAGE_KEY = "formulate:app-mode";
const QUERY_FLAG = "app";
const UA_MARKER = "FormulateMobile";

export function AppModeBoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let appMode = false;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get(QUERY_FLAG) === "1") appMode = true;
      if (window.localStorage.getItem(STORAGE_KEY) === "1") appMode = true;
      if (window.navigator.userAgent.includes(UA_MARKER)) appMode = true;
    } catch {
      // localStorage may be unavailable (SSR, private mode) — fall back
      // to the URL/UA checks above and leave app mode off.
    }

    if (appMode) {
      document.documentElement.classList.add("app-mode");
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, []);

  return null;
}
