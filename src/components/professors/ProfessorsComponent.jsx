/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import "./ProfessorsComponent.css";

function ProfessorsComponent({
  professors,
  showSubject,
  showInstructionsCount,
  showTime,
  buttonText,
  buttonVariant,
}) {
  return (
    <>
      <div className="professor-container">
        {professors.map((professor) => (
          <div key={professor.url} className="professor">
            <img
              src={professor.image}
              className="professor-image"
              alt={professor.name}
            />
            <div className="professor-info">
              <h3 className="professor-text">{professor.name}</h3>
              {showSubject && (
                <p className="professor-text">{professor.subjectTitle}</p>
              )}
              {showInstructionsCount && (
                <div className="instructionsCount-container">
                  <img src="/icons/users-icon.svg" className="users-icon" />
                  <p>{professor.instructionsCount}</p>
                </div>
              )}

              {showTime && (
                <div className="instructionsCount-container">
                  <img src="/icons/users-icon.svg" className="users-icon" />
                  <p>{professor.time}</p>
                </div>
              )}
              <Button variant={buttonVariant ? buttonVariant : "contained"}>
                {buttonText ? buttonText : "Dogovori termin"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfessorsComponent;
