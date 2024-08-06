import buildEntries from "./lib/buildEntries";
import getIsDevMode from "./lib/getIsDevMode";
import watchEntries from "./lib/watchEntries";
import buildWatcher from "./plugins/buildWatcher";
import sassPostcss from "./plugins/sassPostcss";
import { Entry } from "./types";

async function init() {
  const devMode = getIsDevMode();

  const entries: Entry[] = [
    {
      entryPoints: [
        "./main.ts",
      ],
      outdir: "dist",
      plugins: [
        buildWatcher({ buildName: "main", devMode }),
        sassPostcss()
      ]
    }
  ];

  if (devMode) watchEntries(entries);
  else buildEntries(entries);
}

init();