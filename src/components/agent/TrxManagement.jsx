import { useState } from "react";
import { Link } from "react-router-dom";
import cashInReq from "../../assets/cashInReq.png";
import cashOutReq from "../../assets/cashOutReq.png";
import Modal from "../Modal"; // নিশ্চিত করুন যে Modal এর পথ সঠিক
import CashInForm from "../servicesItems/CashInForm";
import CashOutForm from "../servicesItems/CashOutForm";

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
          onClick={() => openModal("Cash In")}
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
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedService === "Cash In" && (
            <CashInForm onSubmit={handleSubmit} />
          )}
          {selectedService === "Cash Out" && (
            <CashOutForm onSubmit={handleSubmit} />
          )}
        </Modal>
      )}
    </>
  );
}

export default TrxManagement;
