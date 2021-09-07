export interface Transaction{
    id:number,
    title:string,
    amount:number,
    type:string,
    category:string,
    createdAt:Date

}

export type TransactionInput = Omit<Transaction, 'id'|'createdAt'>;