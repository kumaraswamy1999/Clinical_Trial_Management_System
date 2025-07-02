export interface RegisterInterface {
    name: string;
    phoneNumber: string | number;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}