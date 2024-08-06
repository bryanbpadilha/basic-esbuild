import getArgs from "./getArgs";

export default function getIsDevMode() {
  const args = getArgs();
  return args.includes("--dev");
}