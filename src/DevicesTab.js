import React, { useEffect, useState } from "react";
import axios from "axios";

const DevicesTab = () => {
  const [devices, setDevices] = useState([]);
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);

  useEffect(() => {
    // Fetching data from mock API for devices
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5") // Simulating 5 devices
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Toggle the accordion for each device
  const toggleAccordion = (device) => {
    setExpandedDevice(expandedDevice === device.id ? null : device.id);
  };

  // Function to select a device title
  const selectDeviceTitle = (device) => {
    const isSelected = selectedDevices.find((d) => d.id === device.id);

    if (!isSelected) {
      const subDevices = ["Device A", "Device B", "Device C"];
      setSelectedDevices([...selectedDevices, { ...device, subDevices }]);
    } else {
      setSelectedDevices(selectedDevices.filter((d) => d.id !== device.id));
    }
  };

  // Function to select individual sub-device
  const selectSubDevice = (device, subDevice) => {
    const isDeviceSelected = selectedDevices.find((d) => d.id === device.id);

    if (isDeviceSelected) {
      const updatedDevices = selectedDevices.map((d) =>
        d.id === device.id
          ? {
              ...d,
              subDevices: isDeviceSelected.subDevices.includes(subDevice)
                ? isDeviceSelected.subDevices.filter((sd) => sd !== subDevice) // Deselect sub-device
                : [...isDeviceSelected.subDevices, subDevice], // Select sub-device
            }
          : d
      );

      setSelectedDevices(updatedDevices);
    } else {
      setSelectedDevices([
        ...selectedDevices,
        { ...device, subDevices: [subDevice] },
      ]);
    }
  };

  // Function to check if a sub-device is selected
  const isSubDeviceSelected = (device, subDevice) => {
    const foundDevice = selectedDevices.find((d) => d.id === device.id);
    return foundDevice?.subDevices.includes(subDevice);
  };

  // Remove device or sub-device from the selected list
  const removeSelectedDevice = (device, subDevice = null) => {
    if (subDevice) {
      const updatedDevices = selectedDevices.map((d) =>
        d.id === device.id
          ? {
              ...d,
              subDevices: d.subDevices.filter((sd) => sd !== subDevice),
            }
          : d
      );
      setSelectedDevices(updatedDevices.filter((d) => d.subDevices.length > 0));
    } else {
      setSelectedDevices(selectedDevices.filter((d) => d.id !== device.id));
    }
  };

  return (
    <div className="flex space-x-4">
      {/* Left side: Device list */}
      <div className="w-1/2 bg-gray-100 p-4 rounded-md shadow">
        <h3 className="text-lg font-semibold mb-4">Devices</h3>
        {devices.map((device) => (
          <div key={device.id} className="mb-4">
            {/* Device title */}
            <div className="flex items-center justify-between">
              <input
                type="checkbox"
                checked={!!selectedDevices.find((d) => d.id === device.id)} // Check if the entire device is selected
                onChange={() => selectDeviceTitle(device)}
                className="ml-2"
              />
              <h4
                className="cursor-pointer text-blue-600 font-medium"
                onClick={() => toggleAccordion(device)}
              >
                {device.title}
              </h4>
            </div>

            {/* Sub-devices (only visible when accordion is expanded) */}
            {expandedDevice === device.id && (
              <div className="pl-4 mt-2">
                {["Device A", "Device B", "Device C"].map((subDevice) => (
                  <div
                    key={subDevice}
                    className="flex items-center justify-between"
                  >
                    <input
                      type="checkbox"
                      checked={isSubDeviceSelected(device, subDevice)} // Check if individual sub-device is selected
                      onChange={() => selectSubDevice(device, subDevice)}
                      className="ml-4"
                    />
                    <span className="my-2 p-2 bg-green-200 w-full ml-3">
                      {subDevice}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side: Selected devices */}
      <div className="w-1/2 bg-white p-4 rounded-md shadow">
        <h3 className="text-lg font-semibold mb-4">Selected Devices</h3>
        {selectedDevices.map((device) => (
          <div key={device.id} className="mb-4">
            <div className="flex items-center justify-between">
              <strong>{device.title}</strong>
              <button
                onClick={() => removeSelectedDevice(device)}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>

            {/* hiding the sublist of selected group */}
            {/* <ul className="ml-4 mt-2 list-disc">
              {device.subDevices.map((subDevice) => (
                <li
                  key={subDevice}
                  className="flex items-center justify-between"
                >
                  {subDevice}
                  <button
                    onClick={() => removeSelectedDevice(device, subDevice)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesTab;
