/**
 * Prefixes a file from /public with the deployment sub-path.
 *
 * Files in /public are emitted verbatim, so a static export served from a
 * sub-path (the GitHub Pages preview lives at /b14-a6-fit-log/) needs the
 * prefix added by hand. next.config.ts injects it as NEXT_PUBLIC_BASE_PATH and
 * the value is empty for every other deployment.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicPath(file: string): string {
  return `${BASE_PATH}${file}`;
}
