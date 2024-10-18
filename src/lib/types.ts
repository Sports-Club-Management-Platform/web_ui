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
    scoreHome: number;
    scoreVisitor: number;
    dateTime: string;
    ClubHomeId: number;
    ClubVisitorId: number;
    PavilionId: number;
    finished: boolean;
    id: number;
}

export interface GamePost {
    jornada: number;
    scoreHome: number;
    scoreVisitor: number;
    dateTime: string;
    ClubHomeId: number;
    ClubVisitorId: number;
    PavilionId: number;
    finished: boolean;
}

//pavilions

export interface PavilionResponse {
    name: string;
    id: number;
    location: string;
    locationUrl: string;
    image: string;
}

export interface PavilionData {
    name: string;
    location: string;
    locationUrl: string;
}

export interface PavilionPost {
    newPavilion: PavilionData;
    image: string;
}

//clubs

export interface ClubResponse {
    name: string;
    id: number;
    image: string;
    pavilionId: number;
}

export interface ClubData {
    name: string;
    pavilionId: number;
}

export interface ClubPost {
    newClub: ClubData;
    image: string;
}