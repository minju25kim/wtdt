import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      code: search.code ? String(search.code) : undefined
    }
  }
})

function RouteComponent() {
  const { code } = Route.useSearch()
  console.log(code)
  return (
    <div>
      {code && <p>Code parameter: {code}</p>}
    </div>
  )
}
