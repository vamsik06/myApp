import React from "react";

interface JobCard {
  companyName: string;
  companyLogo: string;
  location: string;
  role: string;
  yearOfPassout: string;
  ctc: string;
  lpa: string;
}

function Latest_jobs() {
  // Sample job data
  const jobs: JobCard[] = [
    {
      companyName: "Kristal Ball Smart",
      companyLogo: "https://placehold.co/100x100", // Placeholder image until you add real logo
      location: "Bangalore",
      role: "QA Engineer",
      yearOfPassout: "2024",
      ctc: "8.0",
      lpa: "4.0 - 8.0 LPA"
    },
    {
      companyName: "TechCorp Solutions",
      companyLogo: "https://placehold.co/100x100",
      location: "Hyderabad",
      role: "Frontend Developer",
      yearOfPassout: "2024",
      ctc: "10.0",
      lpa: "6.0 - 10.0 LPA"
    },
    {
      companyName: "Digital Dynamics",
      companyLogo: "https://placehold.co/100x100",
      location: "Mumbai",
      role: "Full Stack Developer",
      yearOfPassout: "2024",
      ctc: "12.0",
      lpa: "8.0 - 12.0 LPA"
    },
    {
      companyName: "Innovate Systems",
      companyLogo: "https://placehold.co/100x100",
      location: "Pune",
      role: "Backend Engineer",
      yearOfPassout: "2024",
      ctc: "15.0",
      lpa: "10.0 - 15.0 LPA"
    },
    {
      companyName: "CloudTech Solutions",
      companyLogo: "https://placehold.co/100x100",
      location: "Delhi",
      role: "DevOps Engineer",
      yearOfPassout: "2024",
      ctc: "14.0",
      lpa: "9.0 - 14.0 LPA"
    },
    {
      companyName: "DataMinds Analytics",
      companyLogo: "https://placehold.co/100x100",
      location: "Chennai",
      role: "Data Scientist",
      yearOfPassout: "2024",
      ctc: "16.0",
      lpa: "12.0 - 16.0 LPA"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            {/* Company Header */}
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src={job.companyLogo} 
                    alt={job.companyName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{job.companyName}</h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Role</span>
                  <span className="font-medium">{job.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Year of Passout</span>
                  <span className="font-medium">{job.yearOfPassout}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">CTC</span>
                  <span className="font-medium">{job.lpa}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <button className="flex-1 bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors duration-300">
                  Show More
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Latest_jobs;