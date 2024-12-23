export interface UserResponse {
    givenName: string;
    email: string;
    familyName: string;
    username: string;
    id: string;
    isActive: boolean;
    updatedAt: string;
}

//games 
export interface GameResponse {
    jornada: number;
    score_home: number | null;
    score_visitor: number | null;
    date_time: string;
    club_home_id: number;
    club_visitor_id: number;
    pavilion_id: number;
    finished: boolean;
    id: number;
}

export interface GamePost {
    jornada: number;
    score_home: number;
    score_visitor: number;
    date_time: string;
    club_home_id: number;
    club_visitor_id: number;
    pavilion_id: number;
    finished: boolean;
}

//pavilions

export interface PavilionResponse {
    name: string;
    id: number;
    location: string;
    location_url: string;
    image: string;
}

export interface PavilionData {
    name: string;
    location: string;
    location_url: string;
}

export interface PavilionPost {
    new_pavilion: PavilionData;
    image: string;
}

//clubs

export interface ClubResponse {
    name: string;
    id: number;
    image: string;
    pavilion_id: number;
}

export interface ClubData {
    name: string;
    pavilion_id: number;
}

export interface ClubPost {
    new_club: ClubData;
    image: string;
}

//payments

export interface CheckoutSessionResponse {
    checkout_url: string;
}

// tickets
export interface TicketResponse {
    id: number
    game_id: number
    name: string
    description: string
    active: boolean
    price: number
    stripe_prod_id: string
    stripe_image_url: string
}