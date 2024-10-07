declare namespace Express {
    export interface Request {
        user?: {
            id: number;
            name: string;
            email: string;
            password: string;
            refreshToken?: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }
}
