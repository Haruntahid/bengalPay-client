import cashInReq from "../../assets/cashInReq.png";
import cashOutReq from "../../assets/cashOutReq.png";

function TrxManagement() {
  return (
    <>
      <div className="grid grid-cols-5 items-center gap-5 mt-10">
        <div className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white">
          <img className="w-24 h-24" src={cashInReq} alt="cash-in-request" />
          <p className="mt-2 text-xl font-semibold">Cash In Requests</p>
        </div>
        <div className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white">
          <img className="w-24 h-24" src={cashOutReq} alt="cash-out-request" />
          <p className="mt-2 text-xl font-semibold">Cash Out Requests</p>
        </div>
      </div>
    </>
  );
}

export default TrxManagement;
