import { atom } from 'recoil';

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user?: any;
    role?: string;
}




const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: undefined,
    role: '',

};

const AUTH_STATE_KEY = 'authState';


export const authState = atom<AuthState>({
    key:AUTH_STATE_KEY,
    default: initialAuthState,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            if (typeof window !== 'undefined') {
                const savedAuth = localStorage.getItem('auth');
                if (savedAuth) {
                    try {
                        setSelf(JSON.parse(savedAuth));
                    } catch (error) {
                        console.error('Failed to parse auth state from localStorage:', error);
                    }
                }

                onSet((newAuthState, _, isReset) => {
                    if (isReset) {
                        localStorage.removeItem('auth');
                    } else {
                        localStorage.setItem('auth', JSON.stringify(newAuthState));
                    }
                });
            }
        },
    ],
});
