import { create } from 'zustand';
import { parseJWT } from '@/utils/jwt'

interface UserState {
    token: string;
    name: string;
    email: string;
    phone: string;
}

type UserActions = {
    login: (token: string) => void;
    logout: () => void;
    setUserInformation: (data: any) => void;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
    token: '',
    name: '',
    email: '',
    phone: '',

    login: (token) => {
        const user = parseJWT(token);
        console.log(user);
        set({
            token: token,
            ...user,
        });
    },
    setUserInformation: (data: any) => {
        set({
            name: data.name,
            email: data.email,
            phone: data.phone,
        });
    },
    logout: () => {
        set({
            token: '',
            name: '',
            email: '',
            phone: '',
        });
    },
}));

