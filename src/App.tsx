
import { Dashboard } from "./components/Dashboard/Index";
import { Header } from "./components/Header/Index";
import { GlobalStyle } from "./styles/global";

import { useState } from "react";
import Modal from 'react-modal';
import { TransactionModal } from "./components/TransactionModal/Index";
import { TransactionsContextProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
    setTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setTransactionModalOpen(false);
  }

  return (
    <TransactionsContextProvider>
      <Header onOpenTransactionModal={handleOpenTransactionModal} />
      <Dashboard />

      <TransactionModal isOpen={isTransactionModalOpen} onRequestClose={handleCloseTransactionModal} />
      <GlobalStyle />

    </TransactionsContextProvider>
  );
}

