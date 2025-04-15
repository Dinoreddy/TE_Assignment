import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import axios from "../lib/AxiosInstance.js";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase.js";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/");
        setProjects(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const columns = [
    { header: "Project Title", accessor: "title" },
    { header: "Project Description", accessor: "description" },
    { header: "Skill Set", accessor: "skillSet" },
    { header: "No of Members", accessor: "no_of_members" },
    { header: "Is Active?", accessor: "isActive" },
    { header: "Created Date", accessor: "createdDate" },
  ];

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

  const filteredData = projects.filter((row) =>
    columns.some((col) =>
      row[col.accessor]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteProject = async () => {
    if (!deleteProjectId) return;
    try {
      await axios.delete(`/${deleteProjectId}`);
      setProjects(projects.filter((p) => p.id !== deleteProjectId));
      setModalOpen(false);
      setDeleteProjectId(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete project");
      console.log("Error in deleting project", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out");
      console.log(error);
    }
  };

  return (
    <>
    <div className="flex items-center justify-center">
    <h1>Cloud based Project Management</h1>
    </div>
      {/* Logout Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg shadow-md text-sm"
        >
          Logout
        </button>
      </div>

      {/* Centered Main Container */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 pt-16">
        <div className="w-full max-w-7xl space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link to="/create" className="self-start">
              <button className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
                Add Project
              </button>
            </Link>
            <input
              type="text"
              placeholder="Search Project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Table */}
          <div className="overflow-hidden shadow-md border border-gray-600 rounded-lg bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full hidden md:table">
                <thead className="bg-gray-100">
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        key={index}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                      >
                        {col.header}
                      </th>
                    ))}
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <tbody>
                    <tr>
                      <td colSpan={columns.length + 1} className="py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Loader className="mr-2 h-5 w-5 animate-spin" />
                          Loading Projects..
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length > 0 ? (
                      filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {columns.map((col, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap"
                            >
                              {col.accessor === "isActive"
                                ? row.isActive
                                  ? "Active"
                                  : "Inactive"
                                : col.accessor === "createdDate"
                                ? formatDate(row.createdDate)
                                : row[col.accessor] || "-"}
                            </td>
                          ))}
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <Link to={`/update/${row.id}`}>
                                <button className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-3 rounded-lg text-sm">
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="bg-red-500 hover:bg-red-400 text-white py-1 px-3 rounded-lg text-sm"
                                onClick={() => {
                                  setDeleteProjectId(row.id);
                                  setModalOpen(true);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length + 1}
                          className="px-4 py-2 text-center text-gray-500"
                        >
                          No Projects found
                        </td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>

              {/* Mobile View */}
              <div className="md:hidden space-y-4 p-4">
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    <span>Loading Projects..</span>
                  </div>
                ) : filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{row.title}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            row.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {row.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{row.description}</p>
                      <div className="text-sm">
                        <p>
                          <span className="font-medium">Skills:</span> {row.skillSet}
                        </p>
                        <p>
                          <span className="font-medium">Members:</span>{" "}
                          {row.no_of_members}
                        </p>
                        <p>
                          <span className="font-medium">Created:</span>{" "}
                          {formatDate(row.createdDate)}
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Link to={`/update/${row.id}`} className="flex-1">
                          <button className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg text-sm">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg text-sm"
                          onClick={() => {
                            setDeleteProjectId(row.id);
                            setModalOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">No Projects found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this project?</p>
            <div className="flex flex-col sm:flex-row justify-end mt-4 gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-blue-400 hover:bg-blue-300 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="bg-red-400 hover:bg-red-300 text-white py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
