export enum EnrollmentStatus {
    ALL = "ALL",
    PAST = "PAST",
    PRESENT = "PRESENT",
}

export interface FederationMember {
    id: number;
    name: string;
    imageUrl: string;
    contactNo: string;
    designation: string;
    startDate: string;
    endDate: string | null;
    designationPriority: number;
    enrollmentStatus: EnrollmentStatus;
}
