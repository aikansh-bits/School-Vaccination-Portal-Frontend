import { useEffect, useState } from "react";
import RightSlider from "../../components/slider_panel";
import { GetAllStudentResponseData } from "../../services/models/students/GetAllStudents";
import { studentApis } from "../../services/apis/student_apis";
import StudentRowSkeletonLoading from "./StudentRowSkeletonLoading";
import AddStudentSlider from "./AddStudentSlider";
import CustomTextInput from "../../components/custom_text_input";
import CustomButton from "../../components/custom_button";
import CustomDropdown from "../../components/custom_dropdown";

const Students = () => {
  const [isAddStudentPopupOpen, setAddStudentPopupOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<GetAllStudentResponseData | null>(null);
  const [studentData, setStudentData] = useState<GetAllStudentResponseData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isStudentUpdate, setIsStudentUpdate] = useState<boolean>(false);

  const [searchName, setSearchName] = useState<string>("");
  const [searchStudentId, setSearchStudentId] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");

  const getStudents = async (isClear: boolean = false) => {
    try {
      setIsLoading(true);
      // Create a filter object for query parameters
      const filterParams: any = {};

      // Only add filters if it's not the "clear" call
      if (!isClear) {
        if (searchName) filterParams.name = searchName;
        if (searchStudentId) filterParams.studentId = searchStudentId;
        if (selectedGrade) filterParams.class = selectedGrade;
        if (vaccinationStatus)
          filterParams.vaccinationStatus = vaccinationStatus === "Vaccinated" ? "vaccinated" : "not_vaccinated";
      }

      // Pass filter parameters dynamically (empty if isClear is true)
      const response = await studentApis.getStudents(filterParams);
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

  // Clear all filters
  // Clear all filters and fetch students
  const clearFilters = () => {
    // Reset filter states
    setSearchName("");
    setSearchStudentId("");
    setSelectedGrade("");
    setVaccinationStatus("");

    // Fetch all students after resetting the filters (send isClear=true)
    getStudents(true); // This will fetch students without applying any filters
  };

  return (
    <div className="flex flex-col bg-graybackground h-full w-full p-[20px] gap-[40px]">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[18px]">Students</span>
        <div
          className="rounded-[8px] bg-lightBlue px-[8px] py-[8px] flex flex-row gap-[4px] items-center cursor-pointer"
          onClick={() => {
            setSelectedStudent(null);
            setAddStudentPopupOpen(true);
            setIsStudentUpdate(false);
          }}>
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>ADD STUDENT</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col border border-borderSubtleGray rounded-[8px] p-[16px] gap-[16px] bg-white">
        <span className="text-[16px] font-semibold ">Filters And Search</span>
        <div className="flex flex-row gap-[20px]">
          <div className="flex flex-col gap-[16px] w-[50%]">
            <CustomTextInput
              placeholder="Search Student Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              fullWidth
            />
            <CustomTextInput
              placeholder="Search Student Id"
              value={searchStudentId}
              onChange={(e) => setSearchStudentId(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex flex-col gap-[16px] w-[50%]">
            <CustomDropdown
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
              placeholder={"Select Vaccination Status"}
              options={["Vaccinated", "Not Vaccinated"]}
              value={vaccinationStatus}
              onChange={(val) => setVaccinationStatus(val)}
              fullWidth
            />
          </div>
        </div>

        {/* Button Section */}
        <div className="flex flex-row gap-[20px]">
          {/* CLEAR Button */}
          <div className="w-[50%]">
            <CustomButton
              text={"CLEAR"}
              isActive={true}
              onClick={clearFilters}
            />
          </div>
          {/* FILTER Button */}
          <div className="w-[50%]">
            <CustomButton
              text={"FILTER"}
              isActive={true}
              onClick={getStudents}
            />
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="flex flex-col rounded-[8px] bg-white border border-border-graybackground">
        <div className="flex flex-row px-[16px] py-[12px] border-b border-border-graybackground bg-slate-200 rounded-t-[8px]">
          <span className="text-[14px] w-[12.5%] font-semibold">
            Student Id
          </span>
          <span className="text-[14px] w-[12.5%] font-semibold">Name</span>
          <span className="text-[14px] w-[12.5%] font-semibold">
            Date Of Birth
          </span>
          <span className="text-[14px] w-[16%] font-semibold">Address</span>
          <span className="text-[14px] w-[12.5%] font-semibold">
            Mobile Number
          </span>
          <span className="text-[14px] w-[12.5%] font-semibold">Grade</span>
          <span className="text-[14px] w-[16.5%] font-semibold">
            Vaccinated With
          </span>
          <span className="text-[14px] w-[5%] font-semibold text-right">
            Actions
          </span>
        </div>

        {isLoading ? (
          <StudentRowSkeletonLoading />
        ) : studentData?.length === 0 ? (
          <div className="text-center p-[16px]">No students found</div>
        ) : (
          studentData?.map((e, index) => (
            <div
              className="flex flex-row px-[16px] py-[12px] border-b border-b-borderSubtleGray"
              key={index}>
              <span className="text-[14px] w-[12.5%]">{e.studentId}</span>
              <span className="text-[14px] w-[12.5%]">{e.name}</span>
              <span className="text-[14px] w-[12.5%]">{e.dob}</span>
              <span className="text-[14px] w-[16%]">{e.address || "--"}</span>
              <span className="text-[14px] w-[12.5%]">
                {e.mobileNumber || "--"}
              </span>
              <span className="text-[14px] w-[12.5%]">{e.class}</span>
              <span className="text-[14px] w-[16.5%]">
                {e.vaccinations.length
                  ? e.vaccinations.map((v, i) => (
                      <span key={i}>
                        {v.vaccineName}
                        {i < e.vaccinations.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "--"}
              </span>
              <span
                className="material-symbols-outlined w-[5%] text-right cursor-pointer"
                onClick={() => {
                  setSelectedStudent(e);
                  setAddStudentPopupOpen(true);
                  setIsStudentUpdate(true);
                }}>
                edit
              </span>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Student Slider */}
      <RightSlider
        isOpen={isAddStudentPopupOpen}
        onClose={() => {
          setAddStudentPopupOpen(false);
          setSelectedStudent(null);
        }}
        title={selectedStudent ? "Edit Student" : "Add new student"}>
        <AddStudentSlider
          isStudentUpdate={isStudentUpdate}
          onClose={() => {
            setAddStudentPopupOpen(false);
            setSelectedStudent(null);
          }}
          refreshStudents={getStudents}
          isOpen={isAddStudentPopupOpen}
          initialData={selectedStudent}
        />
      </RightSlider>
    </div>
  );
};

export default Students;
