// Flat config for ESLint 9. Replaces `next lint`, which Next 16 removed -- the old
// script errored and nothing invoked it, so ESLint had never read a file here.
//
// eslint MUST stay on 9.x. eslint-config-next declares peer eslint >=9.0.0, but the
// eslint-plugin-react it bundles peers only "... || ^9.7" and throws
// "contextOrFilename.getFilename is not a function" on ESLint 10. Verified in
// formulate-web on 2026-08-18. Do not "upgrade" this to 10.
//
// Do NOT install eslint-plugin-react / -react-hooks / -import / -jsx-a11y separately;
// eslint-config-next ships all of them as real dependencies.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

export default [
  { ignores: ["node_modules/**", ".next/**", "public/**", "tools/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // OFF deliberately. This is a prose site: 1,923 of the 2,597 errors on the day
      // linting was switched on (74%) were apostrophes and quotes inside guide copy.
      // React escapes these correctly; the rule is a holdover and it drowns the real
      // signal. Turn it back on with one line if you ever want the audit.
      "react/no-unescaped-entities": "off",
    },
  },
];

// KEPT ON, deliberately, though it is the next-largest source (654):
// @next/next/no-html-link-for-pages. There is no pages/ directory here, so the rule
// is technically the pages-router one -- but what it flags is real: <a href="/guides/...">
// used for internal navigation, which costs a full page reload instead of client-side
// nav. That is a live SEO/UX question on this site, so it is baselined rather than
// silenced, and the ratchet stops it growing.
