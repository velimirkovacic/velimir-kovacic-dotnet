import "./HomePage.css";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import ProfessorsComponent from "../../components/professors/ProfessorsComponent";
import { getSubjects } from '../../api/SubjectApi';
import { getProfessors } from '../../api/ProfessorApi';

function HomePage() {
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
      const fetchSubjects = async () => {
        const fetchedSubjects = await getSubjects();
        setSubjects(fetchedSubjects.subjects);
      };

      const fetchProfessors = async () => {
        const fetchedProfessors = await getProfessors();
        setProfessors(fetchedProfessors.professors);
      };

    fetchSubjects();
    fetchProfessors();
  }, []);

    

  if (!localStorage.getItem('token')) {
    window.location.href = '/login';
  }

  return (
    <>
      <div className="homepage-wrapper">
        <div className="homepage-container">
          <div>
            <div className="title">
              <img src="/logo/dotGet-logo.svg" alt="" />
              <h2>instrukcije po mjeri!</h2>
            </div>

            <div className="search-container">
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <img
                      src="/icons/search-icon.svg"
                      style={{ height: "20px", width: "20px" }}
                    />
                  </InputAdornment>
                }
              />

              <Button variant="contained">Pretraži</Button>
            </div>

            <div>
              {subjects.map((subject) => (
                <Link
                  to={`/subject/${subject.url}`}
                  key={subject.url}
                  className="link-no-style"
                >
                  <div className="predmet">
                    <h2 className="predmet-text">{subject.title}</h2>
                    <p className="predmet-text">{subject.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>Najpopularniji instruktori:</h4>
            <ProfessorsComponent
              professors={professors}
              showSubject={true}
              showInstructionsCount={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
