import { useEffect, useState } from "react";
import CustomButton from "../../components/custom_button";
import CustomDropdown from "../../components/custom_dropdown";
import CustomTextInput from "../../components/custom_text_input";
import { CreateStudentPayload } from "../../services/models/students/CreateStudent";
import { studentApis } from "../../services/apis/student_apis";
import { GetAllStudentResponseData } from "../../services/models/students/GetAllStudents";
import { UpdateStudentPayload } from "../../services/models/students/UpdateStudent";
import { driveApis } from "../../services/apis/drive_apis";

interface AddStudentSliderProps {
  onClose: () => void;
  refreshStudents: () => void;
  isOpen: boolean;
  isStudentUpdate: boolean;
  initialData?: GetAllStudentResponseData | null;
}

const AddStudentSlider = ({
  onClose,
  refreshStudents,
  isOpen,
  initialData,
  isStudentUpdate,
}: AddStudentSliderProps) => {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDrive, setSelectedDrive] = useState("");
  const [error, setError] = useState("");
  const [drives, setDrives] = useState<string[]>();

  useEffect(() => {
    if (isOpen) {
      getDrives();
    }
    if (initialData) {
      setFullName(initialData.name || "");
      setSelectedGrade(initialData.class || "");
      setDob(initialData.dob || "");
      setMobileNumber(initialData.mobileNumber || "");
      setAddress(initialData.address || "");
    } else {
      setFullName("");
      setMobileNumber("");
      setDob("");
      setAddress("");
      setSelectedGrade("");
      setSelectedDrive("");
      setError("");
    }
  }, [initialData, isOpen]);

  const createStudent = async () => {
    if (!fullName.trim() || !selectedGrade.trim() || !dob.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    if (mobileNumber && !/^\d{10}$/.test(mobileNumber.trim())) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    try {
      setError("");

      const payload: CreateStudentPayload = {
        name: fullName.trim(),
        class: selectedGrade.trim(),
        dob: dob.trim(),
        mobileNumber: mobileNumber.trim() || undefined,
        address: address.trim() || undefined,
        vaccinations: selectedDrive ? [selectedDrive.trim()] : [],
      };

      await studentApis.createStudent(payload);
      refreshStudents();
      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err.message ||
        "Failed to save student.";
      setError(errorMessage);
    }
  };

  const updateStudent = async () => {
    if (!fullName.trim() || !selectedGrade.trim() || !dob.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    if (mobileNumber && !/^\d{10}$/.test(mobileNumber.trim())) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    try {
      setError("");
      const previousVaccinations =
        initialData?.vaccinations.map((v) => v.vaccineName) || [];

      if (
        selectedDrive &&
        previousVaccinations.includes(selectedDrive.trim())
      ) {
        setError("This vaccine has already been assigned to the student.");
        return;
      }

      const newVaccinations = selectedDrive
        ? [...previousVaccinations, selectedDrive.trim()]
        : previousVaccinations;

      const payload: UpdateStudentPayload = {
        name: fullName.trim(),
        class: selectedGrade.trim(),
        dob: dob.trim(),
        mobileNumber: mobileNumber.trim() || undefined,
        address: address.trim() || undefined,
        vaccinations: newVaccinations,
      };

      await studentApis.updateStudent(payload, initialData?.studentId!);
      refreshStudents();
      onClose();
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err.message ||
        "Failed to save student.";
      setError(errorMessage);
    }
  };

  const getDrives = async () => {
    try {
      const response = await driveApis.getAllDrives();
      const allDrives = response.data;

      let availableDrives: string[] = [];

      // Get list of already taken vaccinations
      const takenVaccines =
        initialData?.vaccinations.map((v) => v.vaccineName) || [];

      allDrives.forEach((drive) => {
        if (!drive.isExpired && !takenVaccines.includes(drive.vaccineName)) {
          availableDrives.push(drive.vaccineName);
        }
      });

      setDrives(availableDrives);
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col justify-between gap-[20px]">
      <div className="flex flex-col gap-[20px]">
        <CustomTextInput
          label="Student's Name*"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
        <CustomTextInput
          label="Mobile Number"
          placeholder="Enter 10-digit Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          fullWidth
        />
        <CustomTextInput
          label="Enter DOB*"
          placeholder="DD-MM-YYYY"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          fullWidth
        />
        <CustomTextInput
          label="Enter Address"
          placeholder="Enter Home Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <CustomDropdown
          label="Add Vaccination"
          options={drives || []}
          value={selectedDrive}
          onChange={(val) => setSelectedDrive(val)}
          fullWidth
        />
        {initialData?.vaccinations.length !== 0 && isStudentUpdate && (
          <div className="flex flex-row bg-yellowSoft rounded-[8px] p-[8px] gap-[8px]">
            <span className="material-symbols-outlined">info</span>
            <div className="flex flex-col">
              <span className="text-black text-sm font-medium">
                Already vaccinated with
              </span>
              <span className="text-[14px]">
                {initialData?.vaccinations.map((v, i) => (
                  <span key={i}>
                    {v.vaccineName}
                    {i < initialData?.vaccinations.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex flex-row items-center gap-[4px]">
          <span className="material-symbols-outlined text-red-600">
            warning
          </span>
          <span className="text-[12px] text-red-600">{error}</span>
        </div>
      )}

      <div className="mt-auto">
        <CustomButton
          text={initialData ? "UPDATE STUDENT" : "ADD STUDENT"}
          isActive={
            fullName.trim() !== "" &&
            selectedGrade.trim() !== "" &&
            dob.trim() !== ""
          }
          onClick={isStudentUpdate ? updateStudent : createStudent}
        />
      </div>
    </div>
  );
};

export default AddStudentSlider;
