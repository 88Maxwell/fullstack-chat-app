import { config } from "app/config";

export default function reportError(error: Error | string | unknown) {
  // TODO: Add Sentry/etc. handler.
//   Temporary way to work with logging. Better to user Logger service, but this way good enough to MVP
  if (config.debug) {
    // eslint-disable-next-line no-console
    console.log("Reported error is :", error);
  }
}
