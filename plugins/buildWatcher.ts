import { PluginBuild } from "esbuild";
import logger from "../lib/logger";

interface Props {
  buildName: string;
  devMode?: boolean;
}

export default function ({ buildName, devMode }: Props) {
  let log = logger(devMode ? "dev" : "build");
  let builds = 0;

  return {
    name: "start/end",
    setup(build: PluginBuild) {
      build.onStart(() => {
        if (builds > 0) {
          log = logger("watch");
        } else {
          log = logger(devMode ? "dev" : "build")
        }

        log.time(`Build ${buildName} started`);
      });
      build.onEnd(() => {
        log.time(`Build ${buildName} ended`);
      });
    },
  };
}
