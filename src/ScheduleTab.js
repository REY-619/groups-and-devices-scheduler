import React, { useState } from "react";

const ScheduleTab = ({ onDateComplete }) => {
  const [schedule, setSchedule] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedSchedule = { ...schedule, [name]: value };
    setSchedule(updatedSchedule);

    // Check if all fields are filled
    const allFilled = Object.values(updatedSchedule).every((val) => val !== "");
    onDateComplete(allFilled);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={schedule.startDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={schedule.startTime}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">End Date</label>
        <input
          type="date"
          name="endDate"
          value={schedule.endDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">End Time</label>
        <input
          type="time"
          name="endTime"
          value={schedule.endTime}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ScheduleTab;
