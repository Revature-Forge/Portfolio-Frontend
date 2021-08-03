import Portfolio from "./Portfolio";

export default interface Matrix {
    id: number;
    portfolio: Portfolio;
    header: string;
    skills: Array<Skill>;
}

export interface Skill {
    id:number;
    name: string;
    value: number;
}