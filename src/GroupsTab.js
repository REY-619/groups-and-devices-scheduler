import React, { useEffect, useState } from "react";
import axios from "axios";

const GroupsTab = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    // Fetching data from mock API
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const selectGroup = (group) => {
    if (!selectedGroups.includes(group)) {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  const removeGroup = (group) => {
    setSelectedGroups(selectedGroups.filter((g) => g.id !== group.id));
  };

  return (
    <div className="flex gap-x-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">Groups</h3>
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between mb-2"
          >
            <span className="bg-gray-100 border-gray-200">{group.name}</span>
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => selectGroup(group)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">Selected Groups</h3>
        {selectedGroups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between mb-2"
          >
            <span>{group.name}</span>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => removeGroup(group)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsTab;
