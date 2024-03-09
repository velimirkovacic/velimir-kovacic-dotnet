import { useParams } from 'react-router-dom';

const SubjectDetail = () => {
  let { url } = useParams();

  return (
    <div>
      <h1>{url}</h1>
      <h1>SUBJECT PAGE</h1>
    </div>
  );
};

export default SubjectDetail;
