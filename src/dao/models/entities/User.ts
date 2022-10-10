export interface IUser {
    type: 'INCOME' | 'EXPENSE';
    address: string;
    number: number;
    lastName: string;
    name: string;
    IDE: string;
    _id?: unknown;
  };
  