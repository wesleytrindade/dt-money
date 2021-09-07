import { Container } from "./styles";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";



export function Summary() {

    const { transactions } = useTransactions();

    let depositAcumulator = 0;
    let withdrawAcumulator = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === 'deposit') {
            depositAcumulator = depositAcumulator + transaction.amount;
        }
    });

    transactions.forEach((transaction) => {
        if (transaction.type === 'withdraw') {
            withdrawAcumulator = withdrawAcumulator - transaction.amount;
        }
    });

    const total = depositAcumulator + withdrawAcumulator;


    return (
        <Container>

            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(Number(depositAcumulator))}</strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(Number(withdrawAcumulator))}</strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(Number(total))}</strong>
            </div>
        </Container>
    )
}