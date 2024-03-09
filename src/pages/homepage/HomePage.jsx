import "./HomePage.css";

import { Link } from "react-router-dom";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import ProfessorsComponent from "../../components/professors/ProfessorsComponent";

let subjects = [
  {
    title: "Diskretna matematika 1",
    url: "dismat",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu fermentum posuere porttitor dui erat amet.",
  },
  {
    title: "Osnove elektotehnike",
    url: "osnele",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu fermentum posuere porttitor dui erat amet.",
  },
  {
    title: "Fizika 1",
    url: "fiz1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu fermentum posuere porttitor dui erat amet.",
  },
  {
    title: "Baze podataka",
    url: "bazpod",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eu fermentum posuere porttitor dui erat amet.",
  },
];

let professors = [
  {
    name: "Ivan Horvat",
    url: "ivan-horvat",
    subjectTitle: "Diskretna Matematika",
    image: "/placeholder.png",
  },
  {
    name: "Petar Ivanić",
    url: "petar-ivanić",
    subjectTitle: "Baze podataka",
    image: "/placeholder.png",
  },
  {
    name: "Maja Petrić",
    url: "maja-petrić",
    subjectTitle: "Baze podataka",
    image: "/placeholder.png",
  },
  {
    name: "Ivona Nađ",
    url: "ivona-nađ",
    subjectTitle: "Osnove elektotehnike",
    image: "/placeholder.png",
  },
];

function HomePage() {
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
            <ProfessorsComponent professors={professors} showSubject={true}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
