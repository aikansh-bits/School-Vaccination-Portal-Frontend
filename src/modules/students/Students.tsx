import { useEffect, useState } from "react";
import RightSlider from "../../components/slider_panel";
import CustomTextInput from "../../components/custom_text_input";
import CustomDropdown from "../../components/custom_dropdown";
import CustomButton from "../../components/custom_button";
import { GetAllStudentResponseData } from "../../services/models/students/GetAllStudents";
import { studentApis } from "../../services/apis/student_apis";

const Students = () => {
  const [isAddStudentPopupOpen, setAddStudentPopupOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDrive, setSelectedDrive] = useState("");
  const [studentData, setStudentData] = useState<GetAllStudentResponseData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const getStudents = async () => {
    try {
      setIsLoading(true);
      const response = await studentApis.getStudents();
      setStudentData(response.data);
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
    getStudents();
  }, []);

  return (
    <div className="flex flex-col bg-graybackground h-full w-full p-[20px] gap-[40px]">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[18px]">Students</span>
        <div
          className="rounded-[8px] bg-lightBlue px-[8px] py-[8px] flex flex-row gap-[4px] items-center cursor-pointer"
          onClick={() => {
            setAddStudentPopupOpen(true);
          }}>
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>ADD STUDENT</span>
        </div>
      </div>
      <div className="flex flex-col rounded-[8px] bg-white border border-border-graybackground">
        <div className="flex flex-row  px-[16px] py-[8px] border-b border-border-graybackground ">
          <span className="text-[14px] w-[20%] font-semibold">Student Id</span>
          <span className="text-[14px] w-[20%] font-semibold">Name</span>
          <span className="text-[14px] w-[20%] font-semibold">Grade</span>
          <span className="text-[14px] w-[20%] font-semibold">
            Vaccinated With
          </span>
          <span className="text-[14px] w-[20%] font-semibold">
            Mark New Vaccine
          </span>
        </div>
        {studentData?.map((e) => {
          return (
            <div className="flex flex-row justify-between px-[16px] py-[12px]">
              <span className="text-[14px] w-[20%]">{e.studentId}</span>
              <span className="text-[14px] w-[20%]">{e.name}</span>
              <span className="text-[14px] w-[20%]">{e.class}</span>
              <span className="text-[14px] w-[20%]">
                {e.vaccinations.map((item) => {
                  return (
                    <span className="text-[14px] w-[20%]">
                      {item.vaccineName}{" "}
                    </span>
                  );
                })}
              </span>
              <span className="text-[14px] w-[20%]">Mark</span>
            </div>
          );
        })}
      </div>
      <RightSlider
        isOpen={isAddStudentPopupOpen}
        onClose={() => {
          setAddStudentPopupOpen(false);
          setFullName("");
          setSelectedGrade("");
          setSelectedDrive("");
        }}
        title="Add new student">
        <div className="h-[calc(100vh-80px)] flex flex-col justify-between gap-[20px]">
          {/* Form Section */}
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
            <CustomDropdown
              label="Select Vaccination Drive"
              options={["Hepatitis B", "Polio", "Corona Vaccine"]}
              value={selectedDrive}
              onChange={(val) => setSelectedDrive(val)}
              fullWidth
            />
          </div>

          {/* Button Section */}
          <div className="mt-auto">
            <CustomButton
              text={"ADD STUDENT"}
              isActive={fullName.trim() !== "" && selectedGrade.trim() !== ""}
              onClick={() => {}}
            />
          </div>
        </div>
      </RightSlider>
    </div>
  );
};
export default Students;
