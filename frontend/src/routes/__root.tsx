import { createRootRoute, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import '../styles/globals.css'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Pocket Fleet - Modern website powered by PocketBase' },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
})

function RootComponent() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <div id="app">
          <Outlet />
        </div>
        <Scripts />
      </body>
    </html>
  )
}
