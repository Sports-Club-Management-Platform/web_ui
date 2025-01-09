import { create } from 'zustand';
import { UserResponse } from '@/lib/types';

//alterar o logout depois

interface UserState {
    token: string;
    email: string;
    name: string;
    username: string;
    id: string;
    updatedAt: string;
    admin: boolean;
}

type UserActions = {
    login: (token: string) => void;
    logout: () => void;
    setUserInformation: (data: UserResponse) => void;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
    token: localStorage.getItem('token') || '',
    email: '',
    name: '',
    username: '',
    id: '',
    updatedAt: '',
    admin: false,

    login: (token) => {
        localStorage.setItem('token', token);
        set({token});
    },
    logout: () => {
        set({
            token: '',
            email: '',
            name: '',
            username: '',
            id: '',
            updatedAt: '',
            admin: false,
        });
        localStorage.removeItem('token');
    },
    setUserInformation: (data: UserResponse) => {
            set({
                email: data.email,
                name: data.name,
                username: data.username,
                id: data.id,
                updatedAt: data.updated_at,
                admin: data.admin,
            });
        }
}));

