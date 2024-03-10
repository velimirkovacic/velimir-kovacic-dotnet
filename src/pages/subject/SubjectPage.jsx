import "./SubjectPage.css";
import ProfessorsComponent from "../../components/professors/ProfessorsComponent";

let professors = [
  {
    name: "Ivan Horvat",
    url: "ivan-horvat",
    subjectTitle: "Diskretna Matematika",
    image: "/placeholder.png",
    instructionsCount: "5",
  },
  {
    name: "Petar Ivanić",
    url: "petar-ivanić",
    subjectTitle: "Baze podataka",
    image: "/placeholder.png",
    instructionsCount: "3",
  },
  {
    name: "Maja Petrić",
    url: "maja-petrić",
    subjectTitle: "Baze podataka",
    image: "/placeholder.png",
    instructionsCount: "3",
  },
  {
    name: "Ivona Nađ",
    url: "ivona-nađ",
    subjectTitle: "Osnove elektotehnike",
    image: "/placeholder.png",
    instructionsCount: "1",
  },
];

function SubjectPage() {
  return (
    <>
      <div className="subjectPage-wrapper">
        <div className="subjectPage-container">
          <div>
            <div className="subjectPage-title">
              <h1>Ime predmeta</h1>
              <p>
                Lorem ipsum dolor sit amet. Aut iusto exercitationem et unde
                sunt cum minima vero et assumenda ipsam aut nulla Quis id
                suscipit suscipit aut illo galisum. Ut omnis dolorem est
                mollitia esse vel vitae fuga qui fugit galisum. Et fugiat
                temporibus quo adipisci quia et quisquam commodi sit similique
                accusantium? Et consequatur velit rem deleniti totam hic
                corporis voluptas est veniam libero et omnis fugit qui commodi
                animi ut natus dolores. Aut temporibus aperiam non repellendus
                porro et deleniti animi ut asperiores Quis nam porro similique.
                Qui sunt iste non perspiciatis sapiente est atque suscipit sit
                iusto aliquid nam corporis corrupti. Eos molestiae repellat et
                voluptatem libero et quia totam et sint cumque vel sunt officia!
                Rem explicabo internos quo numquam sequi et ipsam odio.
              </p>
            </div>
          </div>

          <div>
            <h4>Najpopularniji instruktori:</h4>
            <ProfessorsComponent
              professors={professors}
              showInstructionsCount={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectPage;
