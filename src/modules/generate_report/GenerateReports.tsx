import { useEffect, useState } from "react";
import CustomDropdown from "../../components/custom_dropdown";
import { driveApis } from "../../services/apis/drive_apis";
import CustomButton from "../../components/custom_button";

const GenerateReports = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [drives, setDrives] = useState<string[]>();
  const [selectedDrive, setSelectedDrive] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const getDrives = async () => {
    try {
      const response = await driveApis.getAllDrives();
      const allDrives = response.data;

      let availableDrives: string[] = [];

      allDrives.forEach((drive) => {
        if (!drive.isExpired) {
          availableDrives.push(drive.vaccineName);
        }
      });

      setDrives(availableDrives);
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };

  const generateReport = async () => {
    try {
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
    getDrives();
  }, []);

  return (
    <div className="flex flex-col bg-graybackground h-full w-full p-[20px] gap-[40px]">
      <span className="text-[18px]">Generate Reports</span>
      <div className="flex flex-col gap-[16px] p-[16px] border border-borderSubtleGray rounded-[8px] bg-white">
        <span className="text-[16px] font-semibold ">Filter</span>
        <div className="flex flex-row gap-[16px]">
          <CustomDropdown
            label="Select Grade"
            placeholder={"Select Grade"}
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
          <CustomDropdown
            label="Select Vaccination"
            options={drives || []}
            value={selectedDrive}
            onChange={(val) => setSelectedDrive(val)}
            fullWidth
          />
        </div>
        <CustomButton
          text={"GENERATE REPORT"}
          isActive={true}
          onClick={generateReport}
        />
      </div>
    </div>
  );
};
export default GenerateReports;
