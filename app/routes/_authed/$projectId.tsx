import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/$projectId"!</div>
}
