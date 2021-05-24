export default class Lead {
    id: number | null;
    name: string;
    email: string;
    phone: string;

    constructor(id = null, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}