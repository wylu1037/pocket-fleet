import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// #region agent log
fetch('http://127.0.0.1:7243/ingest/35209b8f-8545-4a69-ae7d-ebf297f11f53',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.tsx:6',message:'router.tsx module loaded',data:{routeTreeType:typeof routeTree},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
// #endregion

function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
  });
  return router;
}

// TanStack Start 1.140+ requires getRouter export
export function getRouter() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/35209b8f-8545-4a69-ae7d-ebf297f11f53',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.tsx:getRouter',message:'getRouter called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  return createRouter();
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
