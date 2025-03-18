import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

function Item({ item, remove, edit, isEditing, editedTask, setEditedTask, saveEdit }) {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {isEditing ? (
        <div className="flex items-center flex-1 space-x-2">
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => saveEdit(item.id)}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg transition duration-200"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      ) : (
        <>
          <span className="text-gray-700">{item.task}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => edit(item.id, item.task)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => remove(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Item;