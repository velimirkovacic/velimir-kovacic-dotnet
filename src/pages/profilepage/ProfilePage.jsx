import ProfessorsComponent from "../../components/professors/ProfessorsComponent";
import "./ProfilePage.css";

function ProfilePage() {
  if (!localStorage.getItem("token")) {
    window.location.href = '/login';
  }
  let student = JSON.parse(localStorage.getItem('student'));

  /*for dev purposes, remove later 
  let student = {};
  student.name = "Petar Klarić";
  student.image = "/placeholder.png";
  student.description =
    "Lorem ipsum dolor sit amet consectetur. Eu fermentum posuere porttitor dui erat amet.";
*/
  student.sentInstructionRequests = [
    {
      name: "Petar Ivanić",
      url: "petar-ivanić",
      subjectTitle: "Diskretna matematika 1",
      time: "20.4.2024. 16:30",
      image: "/placeholder.png",
    },
    {
      name: "Maja Petrić",
      url: "maja-petrić",
      subjectTitle: "Fizika 1",
      time: "20.4.2024. 16:30",
      image: "/placeholder.png",
    },
    {
      name: "Maja Petrić",
      url: "maja-petrić",
      subjectTitle: "Fizika 1",
      time: "20.4.2024. 16:30",
      image: "/placeholder.png",
    },
  ];

  student.upcomingInstructions = [
    {
      name: "Petar Ivanić",
      url: "petar-ivanić",
      subjectTitle: "Diskretna matematika 1",
      time: "20.4.2024. 16:30",
      image: "/placeholder.png",
    },
    {
      name: "Maja Petrić",
      url: "maja-petrić",
      subjectTitle: "Fizika 1",
      time: "20.4.2024. 16:30",
      image: "/placeholder.png",
    },
  ];

  student.pageInstructions = [
    {
      name: "Petar Ivanić",
      url: "petar-ivanić",
      subjectTitle: "Diskretna matematika 1",
      time: "20.4.2024. 16:30",
      image: "/placeholder.png",
    },
    {
      name: "Maja Petrić",
      url: "maja-petrić",
      subjectTitle: "Fizika 1",
      time: "20.4.2024. 16:30",
      image: "/placeholder.png",
    },
  ];
  return (
    <>
      <div className="profilepage-wrapper">
        <div className="profilepage-container">
          <div className="student-info">
            <img src={student.image} className="student-image" />
            <div>
              <h1>{student.name} {student.surname}</h1>
              <p>{student.description}</p>
            </div>
          </div>

          <div>
            <h4>Poslani zahtjevi za instrukcije:</h4>
            <ProfessorsComponent
              professors={student.sentInstructionRequests}
              showTime={true}
              showSubject={true}
              buttonText={"Promjeni"}
              buttonVariant={"outlined"}
            />
          </div>

          <div>
            <h4>Nadolazeće instrukcije:</h4>
            <ProfessorsComponent
              professors={student.upcomingInstructions}
              showTime={true}
              showSubject={true}
              buttonText={"Promjeni"}
              buttonVariant={"outlined"}
            />
          </div>

          <div>
            <h4>Povijest instrukcija:</h4>
            <ProfessorsComponent
              professors={student.pageInstructions}
              showTime={true}
              showSubject={true}
              buttonText={"Ponovno dogovori"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
