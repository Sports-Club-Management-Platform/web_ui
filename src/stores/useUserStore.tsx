import { create } from 'zustand';
import { UserResponse } from '@/lib/types';
import { NavigateFunction} from 'react-router-dom';

//alterar o logout depois

interface UserState {
    token: string;
    givenName: string;
    email: string;
    familyName: string;
    username: string;
    id: string;
    isActive: boolean;
    updatedAt: string;
}

type UserActions = {
    login: (token: string) => void;
    logout: (navigate: NavigateFunction) => void;
    setUserInformation: (data: UserResponse) => void;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
    token: '',
    givenName: '',
    email: '',
    familyName: '',
    username: '',
    id: '',
    isActive: false,
    updatedAt: '',

    login: (token) => {
        set({token});
    },
    setUserInformation: (data: UserResponse) => {
        set({
            givenName: data.given_name,
            email: data.email,
            familyName: data.family_name,
            username: data.username,
            id: data.id,
            isActive: Boolean(data.is_active),
            updatedAt: data.updated_at
        });
    },
    logout: () => {
        set({
            token: '',
            givenName: '',
            email: '',
            familyName: '',
            username: '',
            id: '',
            isActive: false,
            updatedAt: '',
        });
    },
}));

