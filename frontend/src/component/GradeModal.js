import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import CloseButton from "./CloseButton";

function GradeModal({ subjects, setSubjects }) {
  const [currGrades, setCurrGrades] = useState(null);

  useEffect(() => {
    const map = new Map();

    if (subjects) {
      for (const { id, grades } of subjects) {
        map.set(id, grades[0]);
      }

      setCurrGrades(map);
    }

    return () => setCurrGrades(null);
  }, [subjects]);

  return (
    <Modal dataAviable={subjects}>
      <div className="modalContent">
        <CloseButton setData={setSubjects} />

        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Disciplina</th>
              <th>Avaliação</th>
              <th>Nota</th>
              <th>Intervalo Ref.</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {subjects && currGrades
              ? subjects.map(({ id, code, name, grades }) => {
                  return (
                    <tr key={id}>
                      <td>{code}</td>
                      <td>{name}</td>
                      <td>
                        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                        <select
                          onChange={({ target }) => {
                            const auxMap = new Map(currGrades);

                            auxMap.set(id, grades[target.value]);
                            setCurrGrades(auxMap);
                          }}
                        >
                          {grades.map(({ name }, index) => (
                            <option key={index} value={index}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{currGrades.get(id).grade}</td>
                      <td>
                        {currGrades.get(id).minGrade +
                          " - " +
                          currGrades.get(id).maxGrade}
                      </td>
                      <td>{currGrades.get(id).date.split("T")[0]}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export default GradeModal;
