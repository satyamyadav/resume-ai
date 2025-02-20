'use client';
import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

export default function Home() {
  const [step, setStep] = useState(0); // 0: Start, 1: LinkedIn, 2: Manual Input
  const [userData, setUserData] = useState({
    name: '',
    profession: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLinkedIn = () => {
    // Logic to connect LinkedIn profile
    router.push('/builder'); // Redirect to builder page
  };

  const handleSkip = () => {
    setStep(2); // Skip to manual input
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and proceed to builder page
    router.push('/builder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 flex flex-col justify-center items-center p-4">
      {/* Hero Section */}
      {step === 0 && (
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
          Resume Builder
          </h1>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            
            AI Powered
          </h2>
          <p className="text-xl text-gray-400 mb-16">
            Build professional resume in minutes.
          </p>
          <button
            onClick={() => setStep(1)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
          >
            Start Building for Free
          </button>
        </div>
      )}

      {/* LinkedIn Connect Section */}
      {step === 1 && (
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Connect Your LinkedIn Profile
          </h2>
          <button
            onClick={handleLinkedIn}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
          >
            <FaLinkedin size={20} />
            <span>Connect with LinkedIn</span>
          </button>
          <button
            onClick={handleSkip}
            className="w-full py-3 text-blue-600 hover:text-blue-700 transition duration-300"
          >
            Skip this step
          </button>
        </div>
      )}

      {/* Manual Input Section */}
      {step === 2 && (
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Tell Us About Yourself
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                Your Name
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="profession"
                id="profession"
                value={userData.profession}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="profession"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                Your Profession
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
            >
              Proceed to Builder
            </button>
          </form>
        </div>
      )}
    </div>
  );
}