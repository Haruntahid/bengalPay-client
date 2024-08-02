import { useState } from "react";
import { Link } from "react-router-dom";
import cashInReq from "../../assets/cashInReq.png";
import cashOutReq from "../../assets/cashOutReq.png";
import Modal from "../Modal";
import CashOutForm from "../servicesItems/CashOutForm";
import CashInReq from "./CashInReq";
import BalanceInquiry from "../servicesItems/BalanceInquiry";
import balanceInquiry from "../../assets/Balance Inquiry.png";
import transactionHistory from "../../assets/Transactions History.png";
import Transactions from "../servicesItems/Transactions";

function TrxManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSubmit = (data) => {
    console.log("Form Data:", data);
    closeModal();
  };

  return (
    <>
      <div className="grid grid-cols-5 items-center gap-5 mt-10">
        <Link
          onClick={() => openModal("Cash In Req")}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white cursor-pointer"
        >
          <img className="w-24 h-24" src={cashInReq} alt="cash-in-request" />
          <p className="mt-2 text-xl font-semibold">Cash In Requests</p>
        </Link>
        <Link
          onClick={() => openModal("Cash Out")}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white cursor-pointer"
        >
          <img className="w-24 h-24" src={cashOutReq} alt="cash-out-request" />
          <p className="mt-2 text-xl font-semibold">Cash Out Requests</p>
        </Link>
        <Link
          onClick={() => openModal("Balance Inquiry")}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white cursor-pointer"
        >
          <img
            className="w-24 h-24"
            src={balanceInquiry}
            alt="balanceInquiry"
          />
          <p className="mt-2 text-xl font-semibold">Balance Inquiry</p>
        </Link>
        <Link
          onClick={() => openModal("Transaction History")}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white cursor-pointer"
        >
          <img
            className="w-24 h-24"
            src={transactionHistory}
            alt="transactionHistory"
          />
          <p className="mt-2 text-xl font-semibold">Transaction History</p>
        </Link>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedService === "Cash In Req" && (
            <CashInReq onSubmit={handleSubmit} />
          )}
          {selectedService === "Cash Out" && (
            <CashOutForm onSubmit={handleSubmit} />
          )}
          {selectedService === "Balance Inquiry" && (
            <BalanceInquiry onSubmit={handleSubmit} />
          )}
          {selectedService === "Transaction History" && (
            <Transactions onSubmit={handleSubmit} />
          )}
        </Modal>
      )}
    </>
  );
}

export default TrxManagement;
