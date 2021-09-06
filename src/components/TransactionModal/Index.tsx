import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer,RadioBox } from './styles';

interface TransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
export function TransactionModal({ isOpen, onRequestClose }: TransactionModalProps) {
    
    const [title,setTitle] = useState('');
    const [value,setValue] = useState(0);
    const [category,setCategory] = useState('');
    const [type,setType] = useState('deposit');

    function handleCreateTransaction(event:FormEvent){
        event.preventDefault();
        console.log({
            title,
            value,
            category,
            type
        });
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
                <img src={closeImg} />
            </button>

            <Container onSubmit={handleCreateTransaction}>
                <h2>Cadastrar Transação</h2>

                <input type="text" 
                value={title} 
                placeholder="Titulo"
                onChange={(event)=>setTitle(event.target.value)}
                />

                <input type="number" 
                value={value} 
                placeholder="Valor"
                onChange={(event)=>setValue(Number(event.target.value))}
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