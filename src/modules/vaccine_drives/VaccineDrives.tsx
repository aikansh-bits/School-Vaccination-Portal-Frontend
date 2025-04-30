import { useEffect, useState } from "react";
import RightSlider from "../../components/slider_panel";
import CustomTextInput from "../../components/custom_text_input";
import CustomDropdown from "../../components/custom_dropdown";
import CustomButton from "../../components/custom_button";
import { Calendar } from "react-date-range";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { driveApis } from "../../services/apis/drive_apis";
import { GetAllDrivesResponseData } from "../../services/models/drive/GetAllDrives";

const VaccineDrives = () => {
  const [isAddDrivePopupOpen, setAddDrivePopupOpen] = useState(false);
  const [vaccineName, setVaccineName] = useState("");
  const [dosesAvailable, setDosesAvailable] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [driveData, setDriveData] = useState<GetAllDrivesResponseData[]>();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const getVaccineDrives = async () => {
    try {
      setIsLoading(true);
      const response = await driveApis.getAllDrives();
      setDriveData(response.data);
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
        <div className="flex flex-row px-[16px] py-[8px] border-b border-border-graybackground">
          <span className="text-[14px] w-[20%] font-semibold">
            Scheduled At
          </span>
          <span className="text-[14px] w-[20%] font-semibold">
            Vaccination Name
          </span>
          <span className="text-[14px] w-[20%] font-semibold">
            Dose Available
          </span>
          <span className="text-[14px] w-[20%] font-semibold">
            Applicable Grades
          </span>
          <span className="text-[14px] w-[20%] font-semibold">Created By</span>
          <span className="text-[14px] w-[20%] font-semibold">Status</span>
        </div>

        {/* Sample Rows */}
        {driveData?.map((e) => {
          return (
            <div className="flex flex-row justify-between px-[16px] py-[12px]">
              <span className="text-[14px] w-[20%]">
                {new Date(e.scheduledDate.toString())
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

              <span className="text-[14px] w-[20%]">{e.vaccineName}</span>
              <span className="text-[14px] w-[20%]">{e.dosesAvailable}</span>
              <span className="text-[14px] w-[20%]">{e.applicableClasses}</span>
              <span className="text-[14px] w-[20%]">{e.createdBy}</span>
              <span className="text-[14px] w-[20%]">Status</span>
            </div>
          );
        })}
      </div>

      {/* Add Drive Right Slider */}
      <RightSlider
        isOpen={isAddDrivePopupOpen}
        onClose={() => {
          setAddDrivePopupOpen(false);
          setVaccineName("");
          setDosesAvailable("");
          setSelectedGrade("");
          setSelectedDate(new Date());
          setSelectedTime("10:00"); // Reset time to default
        }}
        title="Add new drive">
        <div className="h-[100dvh] flex flex-col overflow-y-scroll gap-[20px] pr-2">
          {/* Form Section */}
          <CustomTextInput
            label="Vaccine Name*"
            placeholder="Enter Vaccine Name"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
            fullWidth
          />
          <CustomTextInput
            label="Dose Available*"
            type="number"
            placeholder="Number of Doses"
            value={dosesAvailable}
            onChange={(e) => setDosesAvailable(e.target.value)}
            fullWidth
          />
          <CustomDropdown
            label="Select Grade*"
            options={[
              "Grade 1",
              "Grade 2",
              "Grade 3",
              "Grade 4",
              "Grade 5",
              "Grade 6",
              "Grade 7",
              "Grade 8",
              "Grade 9",
              "Grade 10",
              "Grade 11",
              "Grade 12",
            ]}
            value={selectedGrade}
            onChange={(val) => setSelectedGrade(val)}
            fullWidth
          />

          {/* Date Picker */}
          <span className="text-black text-sm font-medium">
            Select Drive Date
          </span>
          <Calendar
            date={selectedDate}
            minDate={new Date()}
            onChange={handleDateChange}
            showDateDisplay={false}
            locale={enUS}
          />

          {/* Time Picker */}
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm font-medium">
              Select Drive Time
            </span>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Submit Button */}
          <CustomButton
            text={"ADD DRIVE"}
            isActive={
              vaccineName.trim() !== "" &&
              dosesAvailable.trim() !== "" &&
              selectedGrade.trim() !== ""
            }
            onClick={() => {
              console.log(
                "Drive scheduled at",
                selectedDate.toDateString(),
                selectedTime
              );
            }}
          />
        </div>
      </RightSlider>
    </div>
  );
};

export default VaccineDrives;
