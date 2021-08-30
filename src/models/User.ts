export default class User {
    constructor(
        public id: number | 0,
        public fname: string | undefined,
        public lname: string | undefined,
        public email: string | undefined,
        public password: string | null,
        public admin: boolean | undefined,

    ){}
}