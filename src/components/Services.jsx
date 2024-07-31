import sendMoney from "../assets/send-money.png";
import cashIn from "../assets/cashin.png";
import balanceInquiry from "../assets/Balance Inquiry.png";
import transactionHistory from "../assets/Transactions History.png";
import cashOut from "../assets/cashout.png";
import SendMoneyForm from "./servicesItems/SendMoneyForm";
import { useState } from "react";
import Modal from "./Modal";
import CashInForm from "./servicesItems/CashInForm";
import CashOutForm from "./servicesItems/CashOutForm";
import BalanceInquiry from "./servicesItems/BalanceInquiry";
import Transactions from "./servicesItems/Transactions";

function Services() {
  const serviceItems = [
    { name: "Send Money", image: sendMoney, form: SendMoneyForm },
    { name: "Cash In", image: cashIn },
    { name: "Balance Inquiry", image: balanceInquiry },
    { name: "Transaction History", image: transactionHistory },
    { name: "Cash Out", image: cashOut },
  ];
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (item) => {
    setSelectedService(item);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleSubmit = (data) => {
    console.log("Form Data:", data);
    closeModal();
  };
  return (
    <>
      <div className="grid grid-cols-5 items-center gap-5 mt-10">
        {serviceItems.map((item, index) => (
          <div
            onClick={() => openModal(item)}
            key={index}
            className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white"
          >
            <img className="w-24 h-24" src={item.image} alt={item.name} />
            <p className="mt-2 text-xl font-semibold">{item.name}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <Modal isOpen={true} onClose={closeModal}>
          {selectedService && selectedService.name === "Send Money" && (
            <SendMoneyForm onSubmit={handleSubmit} />
          )}
          {selectedService && selectedService.name === "Cash In" && (
            <CashInForm onSubmit={handleSubmit} />
          )}
          {selectedService && selectedService.name === "Cash Out" && (
            <CashOutForm onSubmit={handleSubmit} />
          )}
          {selectedService && selectedService.name === "Balance Inquiry" && (
            <BalanceInquiry onSubmit={handleSubmit} />
          )}
          {selectedService &&
            selectedService.name === "Transaction History" && (
              <Transactions onSubmit={handleSubmit} />
            )}
        </Modal>
      )}
    </>
  );
}

export default Services;
