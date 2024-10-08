import esbuild, { BuildContext } from "esbuild";
import baseConfig from "../baseConfig";
import { Entry } from "../types";

export default async function watchEntries(entries: Entry[]) {
  const contexts: BuildContext[] = [];

  for (const entry of entries) {
    contexts.push(await esbuild.context({
      ...baseConfig,
      ...entry
    }));
  }

  for (const context of contexts) {
    await context.watch();
  }
}