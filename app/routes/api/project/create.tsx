import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/lib/supabase'

export const APIRoute = createAPIFileRoute('/api/project/create')({
  POST: async ({ request }) => {
    const supabase = await getSupabaseServerClient()
    
    const { data: { user }, error: sessionError } = await supabase.auth.getUser()
    
    if (!user || sessionError) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const userId = user.id

    try {
      const { data: newProject, error } = await supabase
        .from('projects')
        .insert({
          name: 'New Project', // Default name or get from request body
          user_id: userId
        })
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ project: newProject }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error creating project:', error)
      return new Response(JSON.stringify({ error: 'Failed to create project' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  },
})
