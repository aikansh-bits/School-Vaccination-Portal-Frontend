import { useEffect, useState } from "react";
import RightSlider from "../../components/slider_panel";
import { GetAllStudentResponseData } from "../../services/models/students/GetAllStudents";
import { studentApis } from "../../services/apis/student_apis";
import StudentRowSkeletonLoading from "./StudentRowSkeletonLoading";
import AddStudentSlider from "./AddStudentSlider";

const Students = () => {
  const [isAddStudentPopupOpen, setAddStudentPopupOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<GetAllStudentResponseData | null>(null);
  const [studentData, setStudentData] = useState<GetAllStudentResponseData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isStudentUpdate, setIsStudentUpdate] = useState<boolean>(false);

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
            setSelectedStudent(null);
            setAddStudentPopupOpen(true);
            setIsStudentUpdate(false);
          }}>
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>ADD STUDENT</span>
        </div>
      </div>
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
        ) : (
          studentData?.map((e, index) => (
            <div className="flex flex-row px-[16px] py-[12px] border-b border-b-borderSubtleGray" key={index}>
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
