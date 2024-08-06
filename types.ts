import { Plugin } from "esbuild";

export interface Entry {
  entryPoints: string[];
  outdir: string;
  plugins?: Plugin[]
}