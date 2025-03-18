import React, { useState } from "react";

function Form({ add }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      add(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-gray-50 rounded-lg p-2 shadow-sm">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Your Task Here!"
          className="flex-1 bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-3 focus:outline-none rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default Form;