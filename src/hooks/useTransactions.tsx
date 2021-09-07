import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Transaction, TransactionInput } from "../interfaces";
import { api } from "../services/api";

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData);

interface TransactionsContextProviderProps {
    children?: ReactNode
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}


export function TransactionsContextProvider(props: TransactionsContextProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function fetchTransactions(): void {
        api.get("transactions")
            .then(response => setTransactions(response.data.transactions))
    }

    async function createTransaction(transactionInput: TransactionInput) {

         await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date().toISOString()
        }).then((response)=>{
            const transaction = response.data;
            setTransactions([...transactions, transaction]);
            console.log(transactions);
        });
     
    }

    useEffect(() => fetchTransactions(), [])

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {props.children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}