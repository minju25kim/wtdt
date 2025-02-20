export const handleAuth = (provider: 'github' | 'twitter' | 'google' | 'signout') => {
    window.location.href = `/api/auth/${provider}`
}