import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Comp() {
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramDescription, setNewProgramDescription] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      let url = 'https://stoplight.io/mocks/shapefit/shapecoach/356362782/programs';
      if (searchTerm) {
        url = `?programName=${searchTerm}`;
      }
      const response = await axios.get(url);
      console.log('API Response:', response.data); 
      if (Array.isArray(response.data)) {
        setPrograms(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const createNewProgram = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://stoplight.io/mocks/shapefit/shapecoach/356362782/programs', {
        programName: newProgramName,
        description: newProgramDescription,
        noOfWeeks: 1,
        programType: 'Strength / Hypertrophy',
        experienceLevel: 'All Levels',
      });
      fetchPrograms();
      setNewProgramName('');
      setNewProgramDescription('');
    } catch (error) {
      console.error('Error creating new program:', error);
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='header'>
          <h2>Program Library</h2>
          <form onSubmit={createNewProgram}>
            <div className="search-container">
              <div className='search-box'>
                <input
                  type='text'
                  placeholder='Search'
                  className='search'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <button type="submit"><i className="fa-solid fa-circle-plus"></i> Create Program</button>
            </div>
          </form>
        </div>
        <div className='content'>
          <table className='table-content'>
            <thead>
              <tr>
                <th>Program Name</th>
                <th>Description</th>
                <th>No Of Weeks</th>
                <th>Program Type</th>
                <th>Experience Level</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id} className={program.programName === searchTerm ? 'highlighted-row' : ''}>
                  <td>{program.programName}</td>
                  <td>{program.description}</td>
                  <td>{program.noOfWeeks}</td>
                  <td>{program.programType}</td>
                  <td>{program.experienceLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
