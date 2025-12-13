import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'

// #region agent log
fetch('http://127.0.0.1:7243/ingest/35209b8f-8545-4a69-ae7d-ebf297f11f53',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'entry-client.tsx:6',message:'entry-client loaded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
// #endregion

// TanStack Start 1.140+ new API: StartClient no longer needs router prop
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  )
})

