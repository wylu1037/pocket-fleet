import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'

// #region agent log
fetch('http://127.0.0.1:7243/ingest/35209b8f-8545-4a69-ae7d-ebf297f11f53',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'entry-server.tsx:7',message:'entry-server module loaded',data:{createStartHandlerType:typeof createStartHandler},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
// #endregion

// TanStack Start 1.140+ new API: createStartHandler directly takes the stream handler
export default createStartHandler(defaultStreamHandler)

