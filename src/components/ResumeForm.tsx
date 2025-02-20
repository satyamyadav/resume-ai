import React, { useState, useEffect } from "react";
import { ResumeData, ResumeFormProps, Experience, Education } from "../types";

const ResumeForm: React.FC<ResumeFormProps> = ({ aiData }) => {
  const [formData, setFormData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [{ title: "", company: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", startDate: "", endDate: "", description: "" }],
    skills: [],
  });

  useEffect(() => {
    if (aiData) {
      setFormData(aiData);
    }
  }, [aiData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: keyof ResumeData,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (section && index !== undefined) {
      const updatedSection = [...formData[section] as Array<Experience | Education>];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addEntry = (section: keyof ResumeData) => {
    const newEntry = section === "experience"
      ? { title: "", company: "", startDate: "", endDate: "", description: "" }
      : { degree: "", institution: "", startDate: "", endDate: "", description: "" };

    setFormData({
      ...formData,
      [section]: [...formData[section] as Array<Experience | Education>, newEntry],
    });
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, skills: value.split(",") });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className=" font-semibold text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="name" className="inline-block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e)}
              className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="email" className="inline-block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="phone" className="inline-block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange(e)}
              className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="linkedin" className="inline-block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              id="linkedin"
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={(e) => handleInputChange(e)}
              className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="github" className="inline-block text-sm font-medium text-gray-700">GitHub</label>
            <input
              id="github"
              type="url"
              name="github"
              value={formData.github}
              onChange={(e) => handleInputChange(e)}
              className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-4">
        <h3 className=" font-semibold text-gray-800">Summary</h3>
        <div className="flex items-center space-x-2">
          
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={(e) => handleInputChange(e)}
            className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 h-20"
          />
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-6">
        <h3 className=" font-semibold text-gray-800">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={exp.title}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="text"
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="inline-block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleInputChange(e, "experience", index)}
                className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 h-20"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry("experience")}
          className="px-2 py-1 bg-transparent text-blue-600 text-sm hover:underline focus:outline-none"
        >
          Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="space-y-6">
        <h3 className=" font-semibold text-gray-800">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={edu.startDate}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="text"
                  name="endDate"
                  value={edu.endDate}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="inline-block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={edu.description}
                onChange={(e) => handleInputChange(e, "education", index)}
                className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 h-20"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry("education")}
          className="px-2 py-1 bg-transparent text-blue-600 text-sm hover:underline focus:outline-none"
        >
          Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className=" font-semibold text-gray-800">Skills</h3>
        <div className="flex items-center space-x-2">
          <label htmlFor="skills" className="inline-block text-sm font-medium text-gray-700">Skills</label>
          <input
            id="skills"
            type="text"
            value={formData.skills.join(",")}
            onChange={handleSkillChange}
            className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-2 py-1 bg-transparent text-blue-600 text-sm border border-blue-600 rounded hover:bg-blue-50 focus:outline-none"
      >
        Update Resume
      </button>
    </form>
  );
};

export default ResumeForm;