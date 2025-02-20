import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='grid h-full'
      style={{
        gridTemplateAreas: `
          "chat wtdt timeline"
          "chat tickets timeline"
        `,
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)'
      }}>
      <div className='border-1 p-4' style={{ gridArea: 'chat' }}>chat</div>
      <div className='border-1 p-4' style={{ gridArea: 'wtdt' }}>wtdt</div>
      <div className='border-1 p-4' style={{ gridArea: 'timeline' }}>timeline</div>
      <div className='border-1 p-4' style={{ gridArea: 'tickets' }}>tickets</div>
    </div>
  )
}