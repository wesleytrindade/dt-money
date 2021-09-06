import { useEffect, useState } from "react";
import { Transaction } from "../../interfaces";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable(){

    const [transactions,setTransactions] = useState<Array<Transaction>>([]);

    function fetchTransactions():void{
      api.get("transactions")
      .then(response=> setTransactions(response.data))
    }
    useEffect(()=> fetchTransactions(),[])
    return(
       <Container>
           <table>
               <thead>
                   <tr>
                       <th>Título</th>
                       <th>Valor</th>
                       <th>Categoria</th>
                       <th>Data</th>
                   </tr>
               </thead>

               <tbody>

                   {transactions.map(transaction=> {return (
                   <tr key={transaction.id}>
                       <td>{transaction.title}</td>
                       <td className={transaction.type}>R$ {transaction.amount} </td>
                       <td>{transaction.category}</td>
                       <td>{transaction.createdAt}</td>
                   </tr>
                   )})}

               </tbody>
           </table>
       </Container>
    )
}