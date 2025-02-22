import { create } from 'zustand'

interface State {
    user: {
        id: string;
        email: string;
        name: string;
        avatar_url: string;
    }
}

interface Actions {
    setUser: (user: State['user']) => void;
}


export const useUserStore = create<State & Actions>((set) => ({
    user: {
        id: '',
        email: '',
        name: '',
        avatar_url: '',
    },
    setUser: (user) => set(() => ({ user })),
}));

