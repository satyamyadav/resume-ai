import React, { useState, useEffect } from "react";
import { ResumeData, ResumeFormProps } from "../types";
import AIHelper from "./AIHelper";
import SectionContainer from "./SectionContainer";

const ResumeForm: React.FC<ResumeFormProps> = ({ aiData, onFormUpdate }) => {
  const [formData, setFormData] = useState<ResumeData>({
    name: "",
    role: "",
    address: "",
    phone: "",
    email: "",
    github: "",
    linkedin: "",
    site: "",
    summary: "",
    skills: [{ category: "", list: "" }],
    education: [{ degree: "", institution: "", startDate: "", endDate: "", description: "" }],
    experience: [{ title: "", company: "", startDate: "", endDate: "", description: "", responsibilities: [] }],
    projects: [{ name: "", technologies: "", details: [] }],
    portfolio: { github: "", linkedin: "" }
  });

  useEffect(() => {
    if (aiData) {
      setFormData(aiData);
    }
  }, [aiData]);

  // debounce call to onFormUpdate when form data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      onFormUpdate(formData);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, onFormUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: keyof ResumeData,
    index?: number,
    subIndex?: number
  ) => {
    const { name, value } = e.target;

    if (section && index !== undefined) {
      const updatedSection = [...(formData[section] as unknown as Array<Record<string, string | string[]>>)];
      if (section === "projects" && name === "details") {
        updatedSection[index] = { ...updatedSection[index], [name]: value.split(",") };
      } else if (section === "experience" && name === "responsibilities" && subIndex !== undefined) {
        const updatedResponsibilities = [...(updatedSection[index].responsibilities as string[])];
        updatedResponsibilities[subIndex] = value;
        updatedSection[index] = { ...updatedSection[index], responsibilities: updatedResponsibilities };
      } else {
        updatedSection[index] = { ...updatedSection[index], [name]: value };
      }
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addEntry = (section: keyof ResumeData) => {
    const newEntry: Record<string, string | string[]> = section === "experience"
      ? { title: "", company: "", startDate: "", endDate: "", description: "", responsibilities: [] }
      : section === "education"
        ? { degree: "", institution: "", startDate: "", endDate: "", description: "" }
        : section === "skills"
          ? { category: "", list: "" }
          : { name: "", technologies: "", details: [] };

    setFormData({
      ...formData,
      [section]: [...(formData[section] as unknown as Array<Record<string, string | string[]>>), newEntry],
    });
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: value };
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleAIApply = (section: keyof ResumeData, index: number | undefined, suggestion: string) => {
    if (section && index !== undefined) {
      const updatedSection = [...(formData[section] as unknown as Array<Record<string, string | string[]>>)];
      if (section === "projects") {
        updatedSection[index] = { ...updatedSection[index], details: suggestion.split(",") };
      } else {
        updatedSection[index] = { ...updatedSection[index], description: suggestion };
      }
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, summary: suggestion });
    }
  };

  const addResponsibility = (index: number) => {
    const updatedExperience = [...formData.experience];
    if (!Array.isArray(updatedExperience[index].responsibilities)) {
      updatedExperience[index].responsibilities = [];
    }
    updatedExperience[index].responsibilities.push("");
    setFormData({ ...formData, experience: updatedExperience });
  };

  return (
    <form className="max-w-6xl mx-auto space-y-2 pb-4">
      <div className="bg-gray-200">
        <SectionContainer title="Personal Information" className="border-none">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <label htmlFor="name" className="inline-block text-sm font-medium text-gray-500">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="role" className="inline-block text-sm font-medium text-gray-500">Role</label>
              <input
                id="role"
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="address" className="inline-block text-sm font-medium text-gray-500">Address</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="phone" className="inline-block text-sm font-medium text-gray-500">Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="email" className="inline-block text-sm font-medium text-gray-500">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="linkedin" className="inline-block text-sm font-medium text-gray-500">LinkedIn</label>
              <input
                id="linkedin"
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="github" className="inline-block text-sm font-medium text-gray-500">GitHub</label>
              <input
                id="github"
                type="url"
                name="github"
                value={formData.github}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>


            <div className="flex items-center space-x-2">
              <label htmlFor="site" className="inline-block text-sm font-medium text-gray-500">Website</label>
              <input
                id="site"
                type="url"
                name="site"
                value={formData.site}
                onChange={(e) => handleInputChange(e)}
                className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
              />
            </div>
          </div>
        </SectionContainer>

        <SectionContainer title="Summary">
          <div className="flex items-center">
            <AIHelper content={formData.summary} resumeData={formData} hierarchy="summary" onApply={(suggestion) => handleAIApply("summary", undefined, suggestion)} />
          </div>
          <div className="flex items-center space-x-2">
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange(e)}
              className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800 h-20"
            />
          </div>
        </SectionContainer>

        <SectionContainer title="Experience">
          {formData.experience.map((exp, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded-lg space-y-1">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <label className="inline-block text-sm font-medium text-gray-500">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={exp.title}
                    onChange={(e) => handleInputChange(e, "experience", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="inline-block text-sm font-medium text-gray-500">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleInputChange(e, "experience", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex items-center space-x-2">
                  <label className="text-nowrap inline-block text-sm font-medium text-gray-500">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => handleInputChange(e, "experience", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-nowrap inline-block text-sm font-medium text-gray-500">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={exp.endDate}
                    onChange={(e) => handleInputChange(e, "experience", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="flex items-center">
                  <label className="inline-block text-sm font-medium text-gray-500">Description</label>
                  <AIHelper content={exp.description} resumeData={formData} hierarchy={`experience[${index}].description`} onApply={(suggestion) => handleAIApply("experience", index, suggestion)} />
                </div>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800 h-15"
                />
              </div>
              <div className="flex items-start space-x-2">
                <div className="flex items-center">
                  <label className="inline-block text-sm font-medium text-gray-500">Responsibilities</label>
                  <AIHelper content={Array.isArray(exp.responsibilities) ? exp.responsibilities.join(",") : ""} resumeData={formData} hierarchy={`experience[${index}].responsibilities`} onApply={(suggestion) => handleAIApply("experience", index, suggestion)} />
                </div>
                <div className="flex-1 space-y-2">
                  {Array.isArray(exp.responsibilities) && exp.responsibilities.map((responsibility, subIndex) => (
                    <textarea
                      key={subIndex}
                      name="responsibilities"
                      value={responsibility}
                      onChange={(e) => handleInputChange(e, "experience", index, subIndex)}
                      className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800 h-10"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addResponsibility(index)}
                    className="bg-transparent text-blue-600 text-sm hover:underline focus:outline-none"
                  >
                    Add Responsibility
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry("experience")}
            className=" bg-transparent text-blue-600 text-sm hover:underline focus:outline-none"
          >
            Add Experience
          </button>
        </SectionContainer>

        <SectionContainer title="Education">
          {formData.education.map((edu, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded-lg space-y-1">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <label className="inline-block text-sm font-medium text-gray-500">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleInputChange(e, "education", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="inline-block text-sm font-medium text-gray-500">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleInputChange(e, "education", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-nowrap inline-block text-sm font-medium text-gray-500">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={edu.startDate}
                    onChange={(e) => handleInputChange(e, "education", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-nowrap inline-block text-sm font-medium text-gray-500">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={edu.endDate}
                    onChange={(e) => handleInputChange(e, "education", index)}
                    className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <label className="inline-block text-sm font-medium text-gray-500">Description</label>
                <textarea
                  name="description"
                  value={edu.description}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800 h-15"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry("education")}
            className=" bg-transparent text-blue-600 text-sm hover:underline focus:outline-none"
          >
            Add Education
          </button>
        </SectionContainer>

        <SectionContainer title="Skills">
          {
            formData.skills.map((skill, index) => (
              <div key={index} className="grid grid-cols-[auto,1fr] gap-4">
                <div>

                  <input
                    type="text"
                    name="category"
                    value={skill.category}
                    onChange={(e) => handleSkillChange(e, index)}
                    className="text-sm font-medium text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                  />
                  <span className="font-medium text-gray-700">:</span>
                </div>
                <input
                  type="text"
                  name="list"
                  value={skill.list}
                  onChange={(e) => handleSkillChange(e, index)}
                  className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                />
              </div>
            )
            )
          }

          <button
            type="button"
            onClick={() => addEntry("skills")}
            className=" bg-transparent text-blue-600 text-sm hover:underline focus:outline-none"
          >
            Add Skill
          </button>
        </SectionContainer>

        <SectionContainer title="Projects">
          {formData.projects.map((project, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded-lg space-y-2">
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-500">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={(e) => handleInputChange(e, "projects", index)}
                  className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-block text-sm font-medium text-gray-500">Technologies</label>
                <input
                  type="text"
                  name="technologies"
                  value={project.technologies}
                  onChange={(e) => handleInputChange(e, "projects", index)}
                  className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800"
                />
              </div>
              <div className="flex items-start space-x-2">
                <div className="flex items-center">
                  <label className="inline-block text-sm font-medium text-gray-500">Details</label>
                  <AIHelper content={Array.isArray(project.details) ? project.details.join(",") : ""} resumeData={formData} hierarchy={`projects[${index}].details`} onApply={(suggestion) => handleAIApply("projects", index, suggestion)} />
                </div>
                <textarea
                  name="details"
                  value={Array.isArray(project.details) ? project.details.join(",") : ""}
                  onChange={(e) => handleInputChange(e, "projects", index)}
                  className="flex-1  bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-400 text-gray-800 h-20"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry("projects")}
            className=" bg-transparent text-blue-600 text-sm hover:underline focus:outline-none"
          >
            Add Project
          </button>
        </SectionContainer>
      </div>
    </form>
  );
};

export default ResumeForm;