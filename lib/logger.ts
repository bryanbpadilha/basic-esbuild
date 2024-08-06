export default function logger(context: string) {
  const timer = Date.now();

  return {
    time(message: string) {
      console.log(`[${context}] ` + message + ` (${Date.now() - timer}ms)`);
    },
    simple(message: string) {
      console.log(`[${context}] ` + message);
    },
    error(message: string, error: string) {
      console.error(`[${context}] ` + message, error);
    },
  };
}