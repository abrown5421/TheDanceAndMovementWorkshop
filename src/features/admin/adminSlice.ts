import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AdminSliceConfig, AdminUser, AdminUserStaffDoc, AdminPageState } from "./adminTypes";

const initialState: AdminSliceConfig = {
  adminMode: false,
  adminAuth: false,
  adminUser: {
    StaffDocId: "",
    UserEmail: "",
    UserFName: "",
    UserLName: "",
    UserRole: "",
  },
  adminUserStaffDoc: {
    StaffImage: "",
    StaffName: "",
    StaffTitle: "",
  },
  AdminPageState: {
    activePageName: "Auth",
    activePageIn: true,
  }
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminMode: (state, action: PayloadAction<boolean>) => {
      state.adminMode = action.payload;
    },
    setAdminAuth: (state, action: PayloadAction<boolean>) => {
      state.adminAuth = action.payload;
    },
    setAdminUser: (state, action: PayloadAction<AdminUser>) => {
      state.adminUser = action.payload;
    },
    setAdminUserStaffDoc: (state, action: PayloadAction<AdminUserStaffDoc>) => {
      state.adminUserStaffDoc = action.payload;
    },
    setAdminState: (state, action: PayloadAction<Partial<AdminSliceConfig>>) => {
      Object.assign(state, action.payload);
    },
    setAdminPage: <K extends keyof AdminPageState>(
      state: AdminSliceConfig,
      action: PayloadAction<{ key: K; value: AdminPageState[K] }>
    ) => {
      state.AdminPageState[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  setAdminMode,
  setAdminAuth,
  setAdminPage,
  setAdminUser,
  setAdminUserStaffDoc,
  setAdminState,
} = adminSlice.actions;

export default adminSlice.reducer;
