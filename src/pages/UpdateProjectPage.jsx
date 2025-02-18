import { useState, useRef, useEffect } from "react";
import axios from "../lib/AxiosInstance.js";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const UpdateProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    title: "",
    description: "",
    skillSet: "",
    no_of_members: 0,
    isActive: false,
  });
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const skillsSet = [
    "Asp.net",
    "PHP",
    "Java",
    "ReactJs",
    "AngularJs",
    "NodeJs",
    "PWA",
    "Flutter",
    "Vue.js",
    "Vanilla Js",
    "SQL Server",
    "MySQL",
    "MongoDB",
    "HTML",
    "CSS",
    "Javascript/jQuery",
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    if (id) fetchProject();
  }, [id]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSkillChange = (skill) => {
    setProject((prev) => {
      const skillsArray = prev.skillSet ? prev.skillSet.split(", ") : [];
      const updatedSkills = skillsArray.includes(skill)
        ? skillsArray.filter((s) => s !== skill)
        : [...skillsArray, skill];

      return { ...prev, skillSet: updatedSkills.join(", ") };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`/${id}`, project);
      setLoading(false);
      toast.success("Project updated successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container bg-white border border-gray-600 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-500">
          Update Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Project Name
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              className="mt-1 block w-full bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-600 focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Project Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              rows="3"
              className="mt-1 block w-full bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-600 focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-medium text-gray-500">
              Skill Set
            </label>
            <div
              className="mt-1 block w-full bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 cursor-pointer focus:ring-2 focus:ring-emerald-500"
              onClick={toggleDropdown}
            >
              {project.skillSet || "Select Skills"}
            </div>

            {dropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-600 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                {skillsSet.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center p-2 hover:bg-gray-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={project.skillSet.split(", ").includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              No of Members
            </label>
            <select
              value={project.no_of_members}
              onChange={(e) =>
                setProject({ ...project, no_of_members: e.target.value })
              }
              className="mt-1 block w-full bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-600 focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select Number of Members</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={project.isActive}
              onChange={() =>
                setProject({ ...project, isActive: !project.isActive })
              }
              className="mr-2 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="isActive" className="text-gray-600">
              Is Active?
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Updating...
              </>
            ) : (
              "Update Project"
            )}
          </button>

          <Link to="/">
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Go Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectPage;
