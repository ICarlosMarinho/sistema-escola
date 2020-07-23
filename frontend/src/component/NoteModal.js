import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import CloseButton from "./CloseButton";

function NoteModal({ notes, setNotes }) {
  const [currNotes, setCurrNotes] = useState(null);

  useEffect(() => {
    const map = new Map();

    if (notes) {
      for (const { id, anotations } of notes) {
        map.set(id, anotations[0]);
      }

      setCurrNotes(map);
    }

    () => setCurrNotes(null);
  }, [notes]);

  return (
    <Modal dataAviable={notes}>
      <div className="modal-content">
        <CloseButton setData={setNotes} />
        {notes && currNotes
          ? notes.map(({ id, fullName, anotations }) => {
              return (
                <div className="note-container" key={id}>
                  <h5>{fullName}</h5>
                  <h6>{anotations[0].date.split("T")[0]}</h6>
                  {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                  <select
                    onChange={({ target }) => {
                      const auxMap = new Map(currNotes);

                      auxMap.set(id, anotations[target.value]);
                      setCurrNotes(auxMap);
                    }}
                  >
                    {anotations.map(({ date }, index) => {
                      return (
                        <option key={index} value={index}>
                          {date.split("T")[0]}
                        </option>
                      );
                    })}
                  </select>
                  <div className="note-text">
                    <p>{currNotes.get(id).text}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </Modal>
  );
}

export default NoteModal;
