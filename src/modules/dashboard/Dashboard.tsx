import { useEffect, useState } from "react";
import Header from "../../components/header";
import { dashboardApis } from "../../services/apis/dashboard_apis";
import { GetDashboardSummaryResponseData } from "../../services/models/dashboard/GetDashboardSummary";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboardData, setDashboardData] =
    useState<GetDashboardSummaryResponseData>();
  const [error, setError] = useState("");

  const getDashboardSummary = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardApis.getDashboardSummary();
      setDashboardData(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    getDashboardSummary();
  }, []);

  return (
    <div className="flex flex-col gap-[40px] bg-graybackground h-full w-full p-[20px]">
      <Header />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-[20px]">
          <div className="bg-softPurple px-[16px] py-[20px] rounded-[16px] flex flex-col gap-[8px] w-[300px] h-[150px]">
            <span className="material-symbols-outlined">book_2</span>
            <span className="text-[32px] font-semibold">
              {dashboardData?.totalStudents}
            </span>
            <span>Total Students</span>
          </div>
          <div className="bg-yellowSoft px-[16px] py-[20px] rounded-[16px] flex flex-col gap-[8px] w-[300px] h-[150px]">
            <span className="bg-graybackground text-[12px] px-[8px] py-[4px] rounded-full inline-block self-end">
              {dashboardData?.vaccinationPercentage}%
            </span>

            <span className="text-[32px] font-semibold">
              {dashboardData?.vaccinatedStudents}
            </span>
            <span>Vaccinated Students</span>
          </div>
        </div>
        <div className="bg-white rounded-[16px] p-[16px] flex flex-col w-[500px]">
          <span className="text-[16px] font-medium mb-[20px]">
            Upcoming Drive
          </span>
          {dashboardData?.upcomingDrives.length === 0 ? (
            <span>No upcoming drive</span>
          ) : (
            dashboardData?.upcomingDrives.map((e) => {
              return (
                <div
                  className="flex flex-row items-center justify-between bg-lightPurple p-[16px] rounded-[16px] mb-[16px]"
                  key={e._id}>
                  <div className="flex flex-row items-center gap-[16px]">
                    <div className="flex flex-col">
                      <span className="text-[12px]">
                        {new Date(e.scheduledDate.toString())
                          .toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            timeZone: "Asia/Kolkata",
                          })
                          .toUpperCase()}
                      </span>

                      <span>
                        {new Date(e.scheduledDate.toString())
                          .toLocaleString("en-IN", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            timeZone: "Asia/Kolkata",
                          })
                          .toUpperCase()}
                      </span>
                    </div>

                    <div className="w-[2px] h-[32px] bg-white" />
                    <div className="flex flex-col">
                      <span className="text-[12px]">{e.applicableClasses}</span>
                      <span className="text-[18px]">{e.vaccineName}</span>
                    </div>
                  </div>

                  <span className="bg-white text-[12px] px-[8px] py-[4px] rounded-full inline-block self-center">
                    {e.dosesAvailable}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
