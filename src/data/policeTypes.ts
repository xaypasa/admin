// Police Report Type Definitions

export interface PoliceInfo {
  id: number;
  number: number;
  name: string;
  phonenumber: string;
  cardnumber: string;
  time: string;
  date: string;
  status?: 'online' | 'offline';
}

export interface PoliceLoginReport {
  id: number;
  officerName: string;
  phoneNumber: string;
  cardNumber: string;
  loginTime: string;
  loginDate: string;
  status: 'online' | 'offline';
}

export interface OffenderInfo {
  id: number;
  sequenceNumber: string;
  fullName: string;
  phoneNumber: string;
  licenseCodeKS: string;  // ລະຫັດ ຂສ
  licenseCodeNV: string;  // ລະຫັດ ນວ
  violationTime: string;
  violationDate: string;
}

export interface PaymentInfo {
  id: number;
  orderNumber: string;
  offenderName: string;
  violationCount: number;
  vehicleType: string;
  paymentTime: string;
  paymentDate: string;
  totalAmount: number;
}

export interface IncomeReport {
  id: number;
  orderNumber: string;
  offenderName: string;
  violationCount: number;
  vehicleType: string;
  incomeTime: string;
  incomeDate: string;
  totalAmount: number;
  currency: 'LAK' | 'USD'; // ກີບ or USD
}

export interface FineInfo {
  id: number;
  orderNumber: string;
  offenderName: string;
  issuingOfficer: string;
  violationCount: number;
  category: string;        // ໝວດ
  article: string;         // ມາດຕາ
  vehicleType: string;
  fineTime: string;
  fineDate: string;
  totalAmount: number;
}

// Union type for all report types
export type ReportData = PoliceInfo | OffenderInfo | PaymentInfo | IncomeReport | FineInfo;

// API Response types
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  success: boolean;
  message?: string;
}

// Filter types for reports
export interface ReportFilters {
  dateFrom?: string;
  dateTo?: string;
  officerName?: string;
  status?: string;
  vehicleType?: string;
} 