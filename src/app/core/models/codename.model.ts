export interface Codename {
    id: number;
    name: string;
}

export interface CodenameList {
    male: Codename[];
    female: Codename[];
    neutral: Codename[];
}