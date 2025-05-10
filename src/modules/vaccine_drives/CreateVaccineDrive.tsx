import { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import { addDays, isBefore, isAfter, startOfDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "./calendarStyles.css";
import CustomTextInput from "../../components/custom_text_input";
import CustomDropdown from "../../components/custom_dropdown";
import CustomButton from "../../components/custom_button";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { driveApis } from "../../services/apis/drive_apis";
import secureLocalStorage from "react-secure-storage";
import { GetAllDrivesResponseData } from "../../services/models/drive/GetAllDrives";

interface CreateVaccineProps {
  onClose: () => void;
  refreshDrives: () => void;
  isOpen: boolean;
  isUpdateDrive: boolean;
  drive?: GetAllDrivesResponseData | null;
}

const CreateVaccineDrive = ({
  refreshDrives,
  drive,
  isUpdateDrive,
  onClose,
  isOpen,
}: CreateVaccineProps) => {
  const [vaccineName, setVaccineName] = useState("");
  const [dosesAvailable, setDosesAvailable] = useState("");
  const [selectedGradeFrom, setSelectedGradeFrom] = useState("");
  const [selectedGradeTo, setSelectedGradeTo] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const today = startOfDay(new Date());
  const fifteenDaysFromToday = addDays(today, 14);

  const handleSubmit = async () => {
    setError(""); // Clear previous error

    // Create a date object for the selected date and fixed time 10:00 AM IST
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(10, 0, 0, 0); // Set time to 10:00 AM IST

    // The payload to send to the backend
    const gradeFromNum = selectedGradeFrom.replace(/\D/g, "");
    const gradeToNum = selectedGradeTo.replace(/\D/g, "");
    if (gradeFromNum > gradeToNum) {
      setError("Grade From cannot be greater than Grade To");
      return;
    }

    const payload = {
      vaccineName: vaccineName.trim(),
      scheduledDate: scheduledDateTime.toISOString(), // Convert to UTC before sending
      dosesAvailable: Number(dosesAvailable),
      applicableClasses: `Grade ${gradeFromNum}-${gradeToNum}`,
      createdBy: String(secureLocalStorage.getItem("fullName") ?? ""),
    };

    try {
      setIsLoading(true);
      await driveApis.createDrive(payload); // Send to backend
      refreshDrives(); // Refresh the drive list
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const updateDrive = async () => {
    setError(""); // Clear previous error

    // Create a date object for the selected date and fixed time 10:00 AM IST
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(10, 0, 0, 0); // Set time to 10:00 AM IST

    const gradeFromNum = selectedGradeFrom.replace(/\D/g, "");
    const gradeToNum = selectedGradeTo.replace(/\D/g, "");
    if (gradeFromNum > gradeToNum) {
      setError("Grade From cannot be greater than Grade To");
      return;
    }

    const payload = {
      vaccineName: vaccineName.trim(),
      scheduledDate: scheduledDateTime.toISOString(), // Convert to UTC before sending
      dosesAvailable: Number(dosesAvailable),
      applicableClasses: `Grade ${gradeFromNum}-${gradeToNum}`,
      createdBy: String(secureLocalStorage.getItem("fullName") ?? ""),
      status: selectedStatus.toLowerCase(),
    };

    try {
      setIsLoading(true);
      await driveApis.updateDrive(payload, drive!._id); // Update the drive on the backend
      refreshDrives(); // Refresh the list of drives after the update
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (drive) {
      setVaccineName(drive.vaccineName);
      setDosesAvailable(drive.dosesAvailable.toString());

      const [from, to] = drive.applicableClasses
        .replace(/Grade /g, "")
        .split("-");
      setSelectedGradeFrom(`Grade ${from.trim()}`);
      setSelectedGradeTo(`Grade ${to.trim()}`);
      const date = new Date(drive.scheduledDate);
      setSelectedStatus(drive.status.toUpperCase());
      setSelectedDate(date);
    } else {
      setVaccineName("");
      setDosesAvailable("");
      setSelectedGradeFrom("");
      setSelectedGradeTo("");
      setSelectedStatus("");
      setSelectedDate(new Date());
    }
  }, [drive, isOpen]);

  return (
    <div className="h-[100dvh] flex flex-col overflow-y-scroll gap-[20px] pr-2">
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
      <div className="flex flex-row gap-[16px]">
        <CustomDropdown
          label="Select Grade From*"
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
          value={selectedGradeFrom}
          onChange={(val) => setSelectedGradeFrom(val)}
          fullWidth
        />
        <CustomDropdown
          label="Select Grade To*"
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
          value={selectedGradeTo}
          onChange={(val) => setSelectedGradeTo(val)}
          fullWidth
        />
      </div>
      <div className="flex flex-col gap-[4px]">
        <span className="text-black text-sm font-medium">
          Select Drive Date
        </span>
        <div className="rounded-[8px] border border-borderSubtleGray flex flex-col px-[16px] pb-[16px] gap-[16px]">
          <Calendar
            date={selectedDate}
            minDate={undefined}
            onChange={setSelectedDate}
            showDateDisplay={false}
            locale={enUS}
            disabledDay={(date) =>
              isBefore(date, today) || !isAfter(date, fifteenDaysFromToday)
            }
            dayContentRenderer={(date) => {
              const isPast = isBefore(date, today);
              const isInRedRange =
                !isPast && !isAfter(date, fifteenDaysFromToday);
              return (
                <div
                  className={`text-black ${isPast ? "grey-day" : ""} ${
                    isInRedRange ? "red-day" : ""
                  }`}>
                  {date.getDate()}
                </div>
              );
            }}
          />
        </div>
      </div>
      {isUpdateDrive && (
        <CustomDropdown
          label="Update Status"
          options={["UPCOMING", "COMPLETED", "CANCELLED"]}
          value={selectedStatus}
          onChange={(val) => setSelectedStatus(val)}
          fullWidth
        />
      )}
      <div className="flex flex-row items-center bg-yellowSoft rounded-[8px] p-[8px] gap-[8px]">
        <span className="material-symbols-outlined text-black">info</span>
        <span className="text-black text-sm font-normal">
          Vaccination drive can only be scheduled 15 days in advance.
        </span>
      </div>
      {error && (
        <div className="flex flex-row items-center gap-[8px]">
          <span className="material-symbols-outlined text-red-600">
            warning
          </span>
          <span className="text-red-500 text-sm">{error}</span>
        </div>
      )}
      <CustomButton
        isButtonLoading={isLoading}
        text={isUpdateDrive ? "UPDATE DRIVE" : "ADD DRIVE"}
        isActive={
          vaccineName.trim() !== "" &&
          dosesAvailable.trim() !== "" &&
          selectedGradeFrom.trim() !== "" &&
          selectedGradeTo.trim() !== ""
        }
        onClick={isUpdateDrive ? updateDrive : handleSubmit}
      />
    </div>
  );
};

export default CreateVaccineDrive;
