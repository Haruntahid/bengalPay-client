import sendMoney from "../assets/send-money.png";
import cashIn from "../assets/cashin.png";
import balanceInquiry from "../assets/Balance Inquiry.png";
import transactionHistory from "../assets/Transactions History.png";
import cashOut from "../assets/cashout.png";
import { Link } from "react-router-dom";

function Services() {
  const serviceItems = [
    { name: "Send Money", image: sendMoney },
    { name: "Cash In", image: cashIn },
    { name: "Balance Inquiry", image: balanceInquiry },
    { name: "Transaction History", image: transactionHistory },
    { name: "Cash Out", image: cashOut },
  ];
  return (
    <>
      <div className="grid grid-cols-5 items-center gap-5">
        {serviceItems.map((item, index) => (
          <Link
            key={index}
            className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white"
          >
            <img className="w-24 h-24" src={item.image} alt={item.name} />
            <p className="mt-2 text-xl font-semibold">{item.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Services;
