import React from "react";
import Modal from "./Modal";
import CloseButton from "./CloseButton";

function AbsenceModal({ absences, setAbsences }) {
  return (
    <Modal dataAviable={absences}>
      <div className="modal-content">
        <CloseButton setData={setAbsences} />
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Disciplina</th>
              <th>Faltas</th>
            </tr>
          </thead>
          <tbody>
            {absences
              ? absences.map(({ id, code, name, total }) => {
                  return (
                    <tr key={id}>
                      <td>{code}</td>
                      <td>{name}</td>
                      <td>{total}</td>
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

export default AbsenceModal;
