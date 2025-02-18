import React, { useState } from "react";

const Table = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", 
    });
  };

  
  const filteredData = data.filter((row) =>
    columns.some((col) => 
      row[col.accessor]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto p-4">
      
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-left border-b border-gray-300">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-2 text-left border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border-b border-gray-300">
                    {col.accessor ? (
                      col.accessor === "isActive" ? (
                        row.isActive ? "Active" : "Inactive"
                      ) : col.accessor === "createdDate" ? (
                        formatDate(row.createdDate)
                      ) : (
                        row[col.accessor]
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border-b border-gray-300 flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded-md">
                    Edit
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-2 text-center text-gray-500">
                No matching data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
