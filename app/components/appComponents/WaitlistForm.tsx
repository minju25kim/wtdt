'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { joinWaitlist } from '@/routes/index'


export function WaitlistForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            const { success } = await joinWaitlist({ data: { email } })
            if (success) {
                setStatus('success')
                setEmail('')
            } else {
                throw new Error('Failed to join waitlist')
            }
        } catch (error) {
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to join waitlist')
        }
    }

    return (
        <div className="max-w-md w-full px-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-center">Join the Waitlist</h2>
                <div className="flex gap-2">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'loading' || status === 'success'}
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                    >
                        {status === 'loading' ? 'Joining...' : 'Join'}
                    </Button>
                </div>
                {status === 'success' && (
                    <p className="text-green-600 text-sm text-center">
                        Thanks for joining the waitlist! We'll be in touch soon.
                    </p>
                )}
                {status === 'error' && (
                    <p className="text-red-600 text-sm text-center">
                        {errorMessage}
                    </p>
                )}
            </form>
        </div>
    )
}