import Header from "../../components/header";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-[40px] bg-graybackground h-full w-full p-[20px]">
      <Header />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-[20px]">
          <div className="bg-softPurple px-[16px] py-[20px] rounded-[16px] flex flex-col gap-[8px] w-[300px]">
            <span className="material-symbols-outlined">book_2</span>
            <span className="text-[32px] font-semibold">124,900</span>
            <span>Total Students</span>
          </div>
          <div className="bg-yellowSoft px-[16px] py-[20px] rounded-[16px] flex flex-col gap-[8px] w-[300px]">
            <span className="bg-graybackground text-[12px] px-[8px] py-[4px] rounded-full inline-block self-end">
              66.27%
            </span>

            <span className="text-[32px] font-semibold">124,900</span>
            <span>Vaccinated Students</span>
          </div>
        </div>
        <div className="bg-white rounded-[16px] p-[16px] flex flex-col w-[500px]">
          <span className="text-[16px] font-medium mb-[20px]">
            Upcoming Drive
          </span>
          <div className="flex flex-row items-center  justify-between bg-lightPurple p-[16px] rounded-[16px]">
            <div className="flex flex-row items-center gap-[16px]">
              <div className="flex flex-col">
                <span className="text-[12px]">26 May</span>
                <span>8:00 AM</span>
              </div>

              <div className="w-[2px] h-[32px] bg-white" />
              <div className="flex flex-col">
                <span className="text-[12px]">Grade 5-6</span>
                <span className="text-[18px]">Corona Vaccine</span>
              </div>
            </div>

            <span className="bg-white text-[12px] px-[8px] py-[4px] rounded-full inline-block self-center">
              100 Doses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
