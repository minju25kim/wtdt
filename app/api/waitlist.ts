import { createServerFn } from '@tanstack/start'
import { getSupabaseServerClient } from '@/lib/supabase'

export const joinWaitlist = createServerFn({ method: 'POST' })
    .validator((data: { email: string }) => data)
    .handler(async ({ data }) => {
        const supabase = await getSupabaseServerClient()
        const { error } = await supabase
            .from('waitlist')
            .insert({ email: data.email })

        if (error) {
            console.error('Error inserting supabase:', error)
            if (error.code === '23505') {
                throw new Error('You are already on the waitlist')
            }
            throw new Error('Failed to join waitlist')
        }
        return { success: true }
    })