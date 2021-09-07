import { FormEvent, useState} from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, TransactionTypeContainer,RadioBox } from './styles';

interface TransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
export function TransactionModal({ isOpen, onRequestClose }: TransactionModalProps) {
    
    const {createTransaction} = useTransactions();

    const [title,setTitle] = useState('');
    const [amount,setAmount] = useState(0);
    const [category,setCategory] = useState('');
    const [type,setType] = useState('deposit');

    async function handleCreateTransaction(event:FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });
        clearState();
        onRequestClose();
        
    }

    function clearState(){
        setCategory('');
        setAmount(0);
        setTitle('');
        setType('deposit');
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="img"/>
            </button>

            <Container onSubmit={handleCreateTransaction}>
                <h2>Cadastrar Transação</h2>

                <input type="text" 
                value={title} 
                placeholder="Titulo"
                onChange={(event)=>setTitle(event.target.value)}
                />

                <input type="number" 
                value={amount} 
                placeholder="Valor"
                onChange={(event)=>setAmount(Number(event.target.value))}
                min="0"
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={()=> {setType('deposit')}}
                        isActive = {type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={()=> {setType('withdraw')}}
                        isActive = {type === 'withdraw'}
                        activeColor = "red"
                    >
                        <img src={outcomeImg} alt="Entrada"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input type="text" 
                placeholder="Categoria"
                value={category}
                onChange={(event)=>setCategory(event.target.value)}

                />
                <button type="submit">
                    Cadastrar
                </button>

            </Container>
        </Modal>
    )
}