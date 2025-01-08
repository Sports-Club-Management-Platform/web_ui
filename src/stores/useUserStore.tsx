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

    login: (token) => {
        localStorage.setItem('token', token);
        set({token});
    },
    setUserInformation: (data: UserResponse) => {
        set({
            email: data.email,
            username: data.username,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at
        });
    },
    logout: () => {
        set({
            token: '',
            email: '',
            name: '',
            username: '',
            id: '',
            updatedAt: '',
        });
        localStorage.removeItem('token');
    },
}));

