import { type RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) =>
  defineRoutes((route) => {
    route("/", "routes/_index.tsx", { index: true });
  })
) satisfies RouteConfig;
