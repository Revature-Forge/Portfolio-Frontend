import User from "./User";

export default interface Portfolio {
    id: number;
    name: string;
    user: User;
    submitted: boolean;
    approved: boolean;
    reviewed: boolean;
    feedback: string;
    admin?: User;
}

