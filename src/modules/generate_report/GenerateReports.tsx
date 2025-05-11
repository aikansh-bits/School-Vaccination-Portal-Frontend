import { useEffect, useState } from "react";
import CustomDropdown from "../../components/custom_dropdown";
import CustomButton from "../../components/custom_button";
import { driveApis } from "../../services/apis/drive_apis";
import { generateReportApis } from "../../services/apis/generate_report_apis";
import { GenerateReportResponse } from "../../services/models/generate_reports/GenerateReport";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GenerateReports = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [drives, setDrives] = useState<string[]>();
  const [selectedDrive, setSelectedDrive] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [reportData, setReportData] = useState<GenerateReportResponse | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getDrives = async () => {
    try {
      const response = await driveApis.getAllDrives();
      const availableDrives = response.data
        .filter((drive) => !drive.isExpired)
        .map((drive) => drive.vaccineName);
      setDrives(availableDrives);
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };

  const generateReport = async (page = 1) => {
    setIsLoading(true);
    try {
      const filters = {
        vaccineName: selectedDrive || undefined,
        class: selectedGrade || undefined,
        page: page,
        limit: 10,
      };

      const response = await generateReportApis.generateReport(filters);
      setReportData(response);
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.total / 10));
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

  const downloadCSV = () => {
    if (!reportData || reportData.data.length === 0) return;

    const headers = [
      "Student Id",
      "Name",
      "Grade",
      "DOB",
      "Status",
      "Vaccinated With",
    ];

    const rows = reportData.data.map((student) => [
      student.studentId,
      student.name,
      student.class,
      student.dob,
      student.status.toUpperCase(),
      student.vaccinations.map((v) => v.vaccineName).join(", "),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vaccination_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    if (!reportData || reportData.data.length === 0) return;

    const doc = new jsPDF();
    const tableColumn = [
      "Student Id",
      "Name",
      "Grade",
      "DOB",
      "Status",
      "Vaccinated With",
    ];
    const tableRows: any[] = [];

    reportData.data.forEach((student) => {
      tableRows.push([
        student.studentId,
        student.name,
        student.class,
        student.dob,
        student.status.toUpperCase(),
        student.vaccinations.map((v) => v.vaccineName).join(", "),
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("vaccination_report.pdf");
  };

  useEffect(() => {
    getDrives();
  }, []);

  return (
    <div className="flex flex-col bg-graybackground h-full w-full p-[20px]">
      <div className="flex flex-row justify-between items-center mb-[20px]">
        <span className="text-[18px]">Generate Reports</span>
        <div className="flex gap-4">
          <CustomButton
            text={"Download CSV"}
            isActive={!!(reportData && reportData.data.length !== 0)}
            onClick={downloadCSV}
          />

          <CustomButton
            text={"Download PDF"}
            isActive={!!(reportData && reportData.data.length !== 0)}
            onClick={downloadPDF}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[16px] p-[16px] border border-borderSubtleGray rounded-[8px] bg-white mb-[20px]">
        <span className="text-[16px] font-semibold ">Filter</span>

        <div className="flex flex-row gap-[16px]">
          <CustomDropdown
            label="Select Grade"
            placeholder="Select Grade"
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
        <div className="flex flex-row gap-[20px]">
          <div className="w-[50%]">
            <CustomButton
              text={"CLEAR"}
              isActive={true}
              onClick={() => {
                setSelectedGrade("");
                setSelectedDrive("");
                setReportData(null);
                setError("");
              }}
            />
          </div>
          <div className="w-[50%]">
            <CustomButton
              text={"GENERATE REPORT"}
              isButtonLoading={isLoading}
              isActive={!isLoading}
              onClick={() => generateReport(1)}
            />
          </div>
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {reportData && (
        <>
          <span className="text-[16px] font-semibold mb-[8px]">
            Report Results
          </span>

          {reportData.data.length === 0 ? (
            <div className="bg-white p-[16px] rounded-[8px] border text-center text-gray-500">
              No reports found for the selected filters.
            </div>
          ) : (
            <>
              <div className="bg-white p-[16px] rounded-[8px] border">
                <div className="flex flex-col rounded-[8px] bg-white border border-border-graybackground">
                  <div className="flex flex-row px-[16px] py-[12px] border-b border-border-graybackground bg-slate-200 rounded-t-[8px]">
                    <span className="text-[14px] w-[14.28%] font-semibold">
                      Student Id
                    </span>
                    <span className="text-[14px] w-[14.28%] font-semibold">
                      Name
                    </span>
                    <span className="text-[14px] w-[14.28%] font-semibold">
                      Grade
                    </span>
                    <span className="text-[14px] w-[14.28%] font-semibold">
                      DOB
                    </span>
                    <span className="text-[14px] w-[14.28%] font-semibold">
                      Status
                    </span>
                    <span className="text-[14px] w-[14.28%] font-semibold">
                      Vaccinated With
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    {reportData.data.map((student, index) => (
                      <div
                        key={index}
                        className="flex flex-row px-[16px] py-[8px]">
                        <span className="text-[14px] w-[14.28%]">
                          {student.studentId}
                        </span>
                        <span className="text-[14px] w-[14.28%]">
                          {student.name}
                        </span>
                        <span className="text-[14px] w-[14.28%]">
                          {student.class}
                        </span>
                        <span className="text-[14px] w-[14.28%]">
                          {student.dob}
                        </span>
                        <span className="text-[14px] w-[14.28%]">
                          {student.status.toUpperCase()}
                        </span>
                        <div className="w-[14.28%]">
                          {student.vaccinations.map((v, i) => (
                            <span key={i} className="text-[14px]">
                              {v.vaccineName}
                              {i < student.vaccinations.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-4 gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => generateReport(currentPage - 1)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                  Prev
                </button>
                <span className="text-sm mt-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => generateReport(currentPage + 1)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GenerateReports;
