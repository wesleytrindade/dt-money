import { Summary } from "../Summary/Index";
import { TransactionsTable } from "../TransactionsTable/Index";
import { Container } from "./styles";

export function Dashboard(){
    return(
        <Container>
            <Summary/>
            <TransactionsTable/>
        </Container>
    )
}