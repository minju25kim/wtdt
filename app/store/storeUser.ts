import { create } from 'zustand'

type State = {
    user: {
        id: string
        email: string
        name: string
        avatar: string
    }
}

type Action = {
    setUser: (user: State['user']) => void
}

export const useUserStore = create<State & Action>((set) => ({
    user: {
        id: '',
        email: '',
        name: '',
        avatar: ''
    },
    setUser: (user) => set(() => ({ user }))
}))

