export const handleAuth = (provider: 'signout') => {
    window.location.href = `/api/auth/${provider}`
}
