export interface StatusModel {
  textColor: string;
  bgColor: string;
}

class DriveStatusColor {
  private statusMap = new Map<string, StatusModel>([
    ["completed", { textColor: "text-green-500", bgColor: "bg-green-100" }],
    ["today", { textColor: "text-blue-500", bgColor: "bg-blue-100" }],
    ["upcoming", { textColor: "text-yellow-500", bgColor: "bg-yellow-100" }],
    ["cancelled", { textColor: "text-red-500", bgColor: "bg-red-100" }], 
  ]);

  public getDriveStatusColor(driveStatus: string): StatusModel {
    const status = driveStatus.toLowerCase();
    return (
      this.statusMap.get(status) || {
        textColor: "text-black",
        bgColor: "bg-white",
      }
    );
  }
}

export default DriveStatusColor;
