import { atom } from 'recoil';

export interface AuthState {
    isAuthenticated: boolean;
    user: any; 
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
};

export const authState = atom<AuthState>({
    key: 'authState',
    default: initialAuthState,
    effects_UNSTABLE: [
        ({ setSelf }) => {
            if (typeof window !== 'undefined') {
                const savedAuth = localStorage.getItem('auth');
                if (savedAuth) {
                    setSelf(JSON.parse(savedAuth));
                }
            }
        },
    ],
});
