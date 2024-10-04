import React, { useState } from "react";

const NameTab = ({ onNameChange }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    onNameChange(newName); // Pass the name back to the parent component
  };

  return (
    <div>
      <label className="block mb-2 text-lg font-semibold">Enter Name:</label>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="type your title"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default NameTab;
