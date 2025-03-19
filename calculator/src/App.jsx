import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (buttonValue) => {
    if (buttonValue === "=") {
      try {
        // Replace "×" with "*" and "÷" with "/" for evaluation
        const calculationString = value.replace(/×/g, "*").replace(/÷/g, "/");
        setResult(eval(calculationString).toString());
        setValue(eval(calculationString).toString());
      } catch (error) {
        setResult("Error");
        setValue("Error");
      }
    } else if (buttonValue === "AC") {
      setValue("");
      setResult("");
    } else if (buttonValue === "DEL") {
      setValue(value.slice(0, -1));
    } else {
      setValue(value + buttonValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-96">
        {/* Display */}
        <div className="mb-6 relative">
          <input
            type="text"
            value={value}
            className="w-full p-4 text-right text-3xl font-semibold bg-gray-700 text-white rounded-lg focus:outline-none"
            readOnly
          />          
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={() => handleButtonClick("AC")}
            className="col-span-2 bg-red-500 hover:bg-red-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            AC
          </button>
          <button
            onClick={() => handleButtonClick("DEL")}
            className="bg-orange-500 hover:bg-orange-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            DEL
          </button>
          <button
            onClick={() => handleButtonClick("÷")}
            className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleButtonClick("7")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            7
          </button>
          <button
            onClick={() => handleButtonClick("8")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            8
          </button>
          <button
            onClick={() => handleButtonClick("9")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            9
          </button>
          <button
            onClick={() => handleButtonClick("×")}
            className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleButtonClick("4")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            4
          </button>
          <button
            onClick={() => handleButtonClick("5")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            5
          </button>
          <button
            onClick={() => handleButtonClick("6")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            6
          </button>
          <button
            onClick={() => handleButtonClick("-")}
            className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleButtonClick("1")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            1
          </button>
          <button
            onClick={() => handleButtonClick("2")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            2
          </button>
          <button
            onClick={() => handleButtonClick("3")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            3
          </button>
          <button
            onClick={() => handleButtonClick("+")}
            className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleButtonClick("0")}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            0
          </button>
          <button
            onClick={() => handleButtonClick(".")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            .
          </button>
          <button
            onClick={() => handleButtonClick("=")}
            className="bg-green-500 hover:bg-green-600 p-4 rounded-lg text-xl font-medium text-white transition"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
