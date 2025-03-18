import React, { useState } from "react";
import Item from "./components/Item";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const removeItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const add = (task) => {
    const id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    setData([...data, { id, task }]);
  };

  const editItem = (id, currentTask) => {
    setEditingId(id);
    setEditedTask(currentTask);
  };

  const saveEdit = (id) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, task: editedTask } : item
      )
    );
    setEditingId(null);
    setEditedTask("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            To-Do List
          </h1>
          <Form add={add} />
          <List>
            {data.map((item) => (
              <Item
                key={item.id}
                item={item}              
                remove={removeItem}
                edit={editItem}
                isEditing={editingId === item.id}
                editedTask={editedTask}
                setEditedTask={setEditedTask}
                saveEdit={saveEdit}
              />
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default App;
