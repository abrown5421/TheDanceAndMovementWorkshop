export interface AdminSliceConfig {
  adminMode: boolean;
  adminAuth: boolean;
  adminUser: AdminUser;
  adminUserStaffDoc: AdminUserStaffDoc;
  AdminPageState: AdminPageState;
}

export interface AdminUser {
  UserEmail: string;
  UserFName: string;
  UserLName: string;
  UserRole: string;
}

export interface AdminUserStaffDoc {
  StaffImage: string;
  StaffName: string;
  StaffTitle: string;
  StaffRate: number;
}

export interface AdminPageState {
    activePageName: string;
    activePageIn: boolean;
}