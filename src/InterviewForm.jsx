import React, { useState } from 'react';

const InterviewForm = ({ onStart }) => {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role && skills && company) {
      onStart({ role, skills, company });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <input
        type="text"
        placeholder="Role (e.g., Frontend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Skills (comma-separated, e.g., React, JavaScript)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Company (e.g., Infosys)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Start Interview</button>
    </form>
  );
};

export default InterviewForm; 