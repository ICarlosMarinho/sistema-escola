import React, { useContext } from "react";
import api from "../utils/api";
import UserContext from "../utils/userContext";

function Sidebar({ students, setSubjects, setNotes, setAbsences }) {
  const [{ token }] = useContext(UserContext);

  function getGrades(id) {
    api
      .get(`/grade/findByStudent/${id}`, {
        headers: { Authorization: token },
      })
      .then(({ data }) => {
        setSubjects(data);
      })
      .catch((error) => console.log(error));
  }

  function getNotes(id, classId) {
    api
      .get(`/anotation/findByStudentAndClass/${id}/${classId}`, {
        headers: { Authorization: token },
      })
      .then(({ data }) => {
        setNotes(data);
      })
      .catch((error) => console.log(error));
  }

  function getAbsences(id) {
    api
      .get(`/absence/findTotalByStudent/${id}`, {
        headers: { Authorization: token },
      })
      .then(({ data }) => {
        setAbsences(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <aside className="sidebar">
      {students.map(({ fullName, id, classId }) => {
        return (
          <div className="student" key={id}>
            <div className="student-detail-area">
              <img
                src="https://thumbs.dreamstime.com/b/gato-engra%C3%A7ado-que-sorri-com-l%C3%ADngua-134655541.jpg"
                alt="student"
              />
              <h2>{fullName}</h2>
            </div>
            <div className="student-btn-area">
              <button className="grades-btn" onClick={() => getGrades(id)}>
                Notas
              </button>
              <button className="absence-btn" onClick={() => getAbsences(id)}>
                Faltas
              </button>
              <button
                className="notes-btn"
                onClick={() => getNotes(id, classId)}
              >
                Diário
              </button>
            </div>
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;
