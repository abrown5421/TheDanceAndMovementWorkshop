import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setUserID,
  setClockIn,
  setClockOut,
  setDuration,
  setRate,
  setIPAddress,
  setLocation,
  setActive,
  setComplete,
  setTimecardDocId,
} from "./timecardSlice";
import Block from "../../../../components/block/Block";
import { useAppSelector } from "../../../../app/store/hooks";
import Cookies from "js-cookie";
import { setEntireNotification } from "../../../../components/notification/notificationSlice";
import {
  insertDataIntoCollection,
  updateDataInCollection,
} from "../../../../services/db/insertData";
import { getDocumentByCondition } from "../../../../services/db/getData";

const Timecard: React.FC = () => {
  const dispatch = useDispatch();
  const timecard = useAppSelector((state) => state.timecard);
  const admin = useAppSelector((state) => state.admin);
  const AdminUserPersist = Cookies.get("authentication");
  const [localTime, setLocalTime] = useState<string>(
    new Date().toLocaleTimeString()
  );
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");

  useEffect(() => {
    const initializeTimecard = async () => {
      const userID = AdminUserPersist || "";
      if (!userID) return;

      const docs = await getDocumentByCondition("Timecards", "UserID", userID);
      const activeTimecard = docs?.find((doc) => doc.Active === true);

      if (activeTimecard) {
        dispatch(setTimecardDocId(activeTimecard.id));
        dispatch(setUserID(userID));
        dispatch(setClockIn(activeTimecard.ClockIn));
        dispatch(setClockOut(activeTimecard.ClockOut));
        dispatch(setDuration(activeTimecard.Duration));
        dispatch(setRate(activeTimecard.Rate));
        dispatch(setIPAddress(activeTimecard.IPAddress));
        dispatch(setLocation(activeTimecard.Location));
        dispatch(setActive(activeTimecard.Active));
        dispatch(setComplete(activeTimecard.Complete));
      }
    };

    initializeTimecard();
  }, [AdminUserPersist, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!timecard.Active || !timecard.TimecardInfo.ClockIn) {
      setElapsedTime("00:00:00");
      return;
    }

    const updateElapsed = () => {
      const clockInTime = new Date(timecard.TimecardInfo.ClockIn).getTime();
      const now = Date.now();
      const diffMs = now - clockInTime;

      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n: number) => n.toString().padStart(2, "0");
      setElapsedTime(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    updateElapsed();
    const timer = setInterval(updateElapsed, 1000);

    return () => clearInterval(timer);
  }, [timecard.Active, timecard.TimecardInfo.ClockIn]);

  const handleClockIn = async () => {
    const now = new Date().toISOString();
    const userID = AdminUserPersist ? AdminUserPersist : "";
    const rate = admin.adminUserStaffDoc.StaffRate;

    let ipAddress = "Unavailable";
    let location = { Lat: 0, Lng: 0 };

    dispatch(setUserID(userID));
    dispatch(setClockIn(now));
    dispatch(setClockOut(""));
    dispatch(setDuration(0));
    dispatch(setRate(rate));
    dispatch(setActive(true));
    dispatch(setComplete(false));

    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      ipAddress = ipData.ip;
      dispatch(setIPAddress(ipAddress));
    } catch (error) {
      console.error("Failed to get IP address:", error);
      dispatch(setIPAddress(ipAddress));
    }

    if (!navigator.geolocation) {
      dispatch(
        setEntireNotification({
          notificationOpen: true,
          notificationSeverity: "error",
          notificationMessage: "Geolocation is not supported by this browser.",
        })
      );
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      location = {
        Lat: position.coords.latitude,
        Lng: position.coords.longitude,
      };
      dispatch(setLocation(location));

      const newTimecard = {
        UserID: userID,
        ClockIn: now,
        ClockOut: "",
        Duration: 0,
        Rate: rate,
        Active: true,
        Complete: false,
        IPAddress: ipAddress,
        Location: location,
      };

      const newDocId = await insertDataIntoCollection("Timecards", newTimecard);
      dispatch(setTimecardDocId(newDocId));
    } catch (error) {
      console.error("Geolocation or Timecard error:", error);
      dispatch(setLocation(location));
      dispatch(
        setEntireNotification({
          notificationOpen: true,
          notificationSeverity: "error",
          notificationMessage:
            "There was an error clocking you in. Be sure you have location services enabled.",
        })
      );
    }
  };

  const handleClockOut = useCallback(() => {
    if (!timecard.docId) {
      console.error("No timecard document ID available for update");
      return;
    }

    const now = new Date();
    const clockIn = new Date(timecard.TimecardInfo.ClockIn);

    const diffMs = Math.abs(clockIn.getTime() - now.getTime());
    const diffMinutes = diffMs / 1000 / 60;

    dispatch(setClockOut(now.toISOString()));
    dispatch(setActive(false));
    dispatch(setComplete(true));
    dispatch(setDuration(diffMinutes));

    updateDataInCollection("Timecards", timecard.docId, {
      ClockOut: now.toISOString(),
      Active: false,
      Complete: true,
      Duration: diffMinutes,
    });
  }, [dispatch, timecard.docId, timecard.TimecardInfo.ClockIn]);

  if (timecard.Active) {
    return (
      <Block tailwindClasses="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-10">
        <Block tailwindClasses="text-black text-2xl">Clocked In</Block>
        <Block tailwindClasses="text-4xl font-mono text-primary mb-2">
          {localTime}
        </Block>
        <Block tailwindClasses="text-lg text-gray-700 mb-6">
          Elapsed Time: {elapsedTime}
        </Block>
        <Block
          as="button"
          children="Clock Out"
          tailwindClasses="mt-5 bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition"
          onClick={handleClockOut}
        />
      </Block>
    );
  }

  return (
    <Block tailwindClasses="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-10">
      <Block tailwindClasses="text-black text-2xl">Clock In</Block>
      <Block tailwindClasses="text-4xl font-mono text-primary mb-6">
        {localTime}
      </Block>
      <Block
        as="button"
        children="Clock In"
        tailwindClasses="mt-5 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-secondary transition"
        onClick={handleClockIn}
      />
    </Block>
  );
};

export default Timecard;
