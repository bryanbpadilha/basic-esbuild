import esbuild from "esbuild";
import baseConfig from "../baseConfig";
import { Entry } from "../types";

export default async function buildEntries(entries: Entry[]) {
  for (const entry of entries) {
    await esbuild.build({
      ...baseConfig,
      ...entry
    });
  }
}