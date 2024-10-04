import React, { useState } from "react";
import GroupsTab from "./GroupsTab";
import DevicesTab from "./DevicesTab";
import NameTab from "./NameTab";
import ScheduleTab from "./ScheduleTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("Name");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [name, setName] = useState(""); // State to store the name

  const handleDateCompletion = (isComplete) => {
    setIsSaveEnabled(isComplete);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== "Schedule") {
      setIsSaveEnabled(false);
    }
  };

  const handleSave = () => {
    alert("Info saved!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Name":
        return <NameTab onNameChange={setName} />; // Pass the setName function
      case "Groups":
        return <GroupsTab />;
      case "Devices":
        return <DevicesTab />;
      case "Schedule":
        return <ScheduleTab onDateComplete={handleDateCompletion} />;
      default:
        return <NameTab onNameChange={setName} />;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <header className="flex justify-between items-center py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold">{name || "My App"}</h1>{" "}
        {/* Show the name or default to "My App" */}
        <div className="space-x-4">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              isSaveEnabled
                ? "hover:bg-blue-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isSaveEnabled}
            onClick={handleSave}
          >
            Save
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Apply
          </button>
        </div>
      </header>
      <nav className="my-4 flex space-x-4  ">
        <button
          className={`px-4 py-2  ${
            activeTab === "Name" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("Name")}
        >
          Name
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Groups" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("Groups")}
        >
          Application Groups
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Devices" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("Devices")}
        >
          Devices
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Schedule" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("Schedule")}
        >
          Schedule
        </button>
      </nav>
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default App;
