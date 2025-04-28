import Header from "../../components/header";
import LeftNavigationPanel from "../../components/LeftNavigationPanel";

const Dashboard = () => {
  return (
    <div className="flex flex-row bg-graybackground h-full w-full ">
      <LeftNavigationPanel />
      <div className="flex flex-col p-[40px] gap-[20px] w-full">
        <Header />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-[20px]">
            <div className="bg-softPurple px-[16px] py-[20px] rounded-[16px] flex flex-col gap-[8px] w-[300px]">
              <span className="material-symbols-outlined">book_2</span>
              <span className="text-[32px] font-semibold">124,900</span>
              <span>Total Students</span>
            </div>
            <div className="bg-yellowSoft px-[16px] py-[20px] rounded-[16px] flex flex-col gap-[8px] w-[300px]">
              <span className="bg-graybackground px-[8px] py-[4px] rounded-full inline-block self-end">
                66.27%
              </span>

              <span className="text-[32px] font-semibold">124,900</span>
              <span>Vaccinated Students</span>
            </div>
          </div>
          <div className="bg-white rounded-[16px] p-[16px] flex flex-col w-[500px]">
            <span className="text-[24px] font-medium">Upcoming Drive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
