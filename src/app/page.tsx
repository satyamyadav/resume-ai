'use client';
import { useState, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import HtmlPreview from '@/components/HtmlPreview';

/**
 * manual data
 * get name, role ( profession )
 * pass to AI to generate resume based on profession
 * resume - name role, AI Response
 * suggestions - blank
 * move to builder page
 * render form and resume
 * 
 */

/**
 * linkedind data
 * get name, role ( profession ), details
 * transform to resume data format
 * pass to AI to generate resume based on linkedin data
 * resume - name role, AI Response
 * suggestions - get suggestions from AI
 * move to builder page
 * render form and resume
 * for fields with suggestions, show suggestions in form
 * 
 */

/**
 * 
 * Add a loading state for the form submission
 * add error handling for form submission
 */

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: Start, 1: LinkedIn, 2: Manual Input
  const [userData, setUserData] = useState({
    name: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [currentResume, setCurrentResume] = useState<null | string>(null);

  useEffect(() => {
    const storedResume = window.localStorage.getItem('renderedHtml');
    if (storedResume && storedResume.length) {
      
      setCurrentResume(storedResume);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLinkedIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/completion/linkedin', { /* LinkedIn data */ });
      window.localStorage.setItem('resume', JSON.stringify(response.data));
      router.push('/builder');
    } catch (error) {
      console.error('Error fetching LinkedIn resume:', error);
      setError('Error fetching LinkedIn resume');
    } finally {
      setLoading(false);
    }

  };

  const handleSkip = () => {
    setStep(2); // Skip to manual input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, role } = userData;
    try {
      setLoading(true);
      
      // Create empty resume in database first
      const resumeResponse = await axios.post('/api/resume', {
        name,
        role,
        
        
      });
      
      // Redirect to resume page
      router.push(`/resume/${resumeResponse.data.id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
      setError('Error creating resume');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 flex flex-col justify-center items-center p-4">
      {/* Hero Section */}
      {step === 0 && (
        <div className="text-center animate-fade-in">
          <h2 className="text-left text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Powered
          </h2>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
            Resume Builder
          </h1>
          <p className="text-l text-gray-400 mb-16">
            <i>
              Build professional resume in minutes.
            </i>
          </p>
          <button
            onClick={() => setStep(2)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
          >
            Start Building for Free
          </button>
        </div>
      )}
      {step === 0 && currentResume && (
        <div className="w-full max-w-md animate-fade-in text-center">
          <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center mt-5">
            OR
          </h2>
          <div className='flex justify-center p-4 rounded'>
            <HtmlPreview html={currentResume} />
          </div>
          <button onClick={() => router.push('/builder')}
            className=" px-4 py-1  text-gray-400 rounded-lg border-2 border-gray-500">
            Continue Editing
          </button>
        </div>
      )}

      {
        step > 0 && (
          // close flow button with icon
          <button
            onClick={() => setStep(0)}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition duration-300"
          >
            <MdClose size={24} />
          </button>
        )
      }

      {/* LinkedIn Connect Section */}
      {step === 1 && (
        <div className="w-full max-w-md space-y-6 animate-fade-in flex flex-col items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Connect Your LinkedIn Profile
          </h2>
          <button
            onClick={handleLinkedIn}
            className="w-[50%] flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
          >
            <FaLinkedin size={20} />
            <span>Connect with LinkedIn</span>
          </button>
          {
            error && (
              <p className="text-red-400">{error}</p>
            )
          }
          <button
            onClick={handleSkip}
            className="w-full py-3 text-gray-400 hover:text-gray-200 transition duration-300"
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
              <label
                htmlFor="name"
                className="text-gray-300 transition-all duration-200 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Your Name
              </label>
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
            </div>
            <div className="relative">
              <label
                htmlFor="role"
                className="text-gray-300 transition-all duration-200 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Your Profession
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={userData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 peer"
                placeholder=" "
                required
              />
            </div>
            {
              error && (
                <p className="text-red-400">{error}</p>
              )
            }
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-purple-600"
              disabled={loading}
            >
              {loading ? 'Getting you resume ready...' : '   Build My Resume   '}
            </button>
          </form>
        </div>
      )}
      

    </div>
  );
}