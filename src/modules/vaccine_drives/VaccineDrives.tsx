import { useEffect, useState } from "react";
import RightSlider from "../../components/slider_panel";
import { driveApis } from "../../services/apis/drive_apis";
import { GetAllDrivesResponseData } from "../../services/models/drive/GetAllDrives";
import CreateVaccineDrive from "./CreateVaccineDrive";
import DriveStatusColor from "../../components/status_class_color";

const VaccineDrives = () => {
  const driveStatusColor = new DriveStatusColor();
  const [isAddDrivePopupOpen, setAddDrivePopupOpen] = useState(false);
  const [isUpdateDrive, setIsUpdateDrive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [driveData, setDriveData] = useState<GetAllDrivesResponseData[]>([]);
  const [error, setError] = useState("");
  const [selectedDrive, setSelectedDrive] =
    useState<GetAllDrivesResponseData | null>(null);

  const getVaccineDrives = async () => {
    try {
      setIsLoading(true);
      const response = await driveApis.getAllDrives();
      setDriveData(response.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVaccineDrives();
  }, []);

  return (
    <div className="flex flex-col bg-graybackground h-full w-full p-[20px] gap-[40px]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <span className="text-[18px]">Vaccination Drives</span>
        <div
          className="rounded-[8px] bg-lightBlue px-[8px] py-[8px] flex flex-row gap-[4px] items-center cursor-pointer"
          onClick={() => setAddDrivePopupOpen(true)}>
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>ADD DRIVE</span>
        </div>
      </div>

      {/* Drives Table */}
      <div className="flex flex-col rounded-[8px] bg-white border border-border-graybackground">
        <div className="flex flex-row px-[16px] py-[8px] border-b border-border-graybackground bg-slate-200 rounded-t-[8px]">
          <span className="text-[14px] w-[14.28%] font-semibold">
            Scheduled At
          </span>
          <span className="text-[14px] w-[17.56%] font-semibold">
            Vaccination Name
          </span>
          <span className="text-[14px] w-[14.28%] font-semibold">
            Dose Available
          </span>
          <span className="text-[14px] w-[14.28%] font-semibold text-center">
            Applicable Grades
          </span>
          <span className="text-[14px] w-[20.28%] font-semibold text-center">
            Created By
          </span>
          <span className="text-[14px] w-[14.28%] font-semibold text-center">Status</span>
          <span className="text-[14px] w-[5%] font-semibold">Actions</span>
        </div>

        {driveData?.map((e, index) => (
          <div
            key={index}
            className="flex flex-row px-[16px] py-[12px]">
            <span className="text-[14px] w-[14.28%]">
              {new Date(e.scheduledDate)
                .toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })
                .toUpperCase()}
            </span>
            <span className="text-[14px] w-[17.56%]">{e.vaccineName}</span>
            <span className="text-[14px] w-[14.28%] ">{e.dosesAvailable}</span>
            <span className="text-[14px] w-[14.28%] text-center">{e.applicableClasses}</span>
            <span className="text-[14px] w-[20.28%] text-center">{e.createdBy}</span>
            <div className=" w-[14.28%] flex flex-row items-center place-content-center">
              <span
                className={`text-[14px] py-[4px] px-[6px] rounded-[4px] inline-block ${
                  driveStatusColor.getDriveStatusColor(e.status).textColor
                } ${driveStatusColor.getDriveStatusColor(e.status).bgColor}`}>
                {e.status.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-row w-[5%]">
              {!e.isExpired && e.status.toLowerCase() !== "today" && (
                <span
                  className="material-symbols-outlined cursor-pointer text-end"
                  onClick={() => {
                    setSelectedDrive(e);
                    setIsUpdateDrive(true);
                    setAddDrivePopupOpen(true);
                  }}>
                  edit
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Drive Right Slider */}
      <RightSlider
        isOpen={isAddDrivePopupOpen}
        onClose={() => setAddDrivePopupOpen(false)}
        title={isUpdateDrive ? "Update drive" : "Add new drive"}>
        <CreateVaccineDrive
          isUpdateDrive={isUpdateDrive}
          drive={selectedDrive}
          onDriveAdded={() => {
            getVaccineDrives();
            setAddDrivePopupOpen(false);
          }}
        />
      </RightSlider>
    </div>
  );
};

export default VaccineDrives;
