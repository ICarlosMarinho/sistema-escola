import React, { useContext, useState } from "react";
import UserContext from "../utils/userContext";
import Sidebar from "../component/Sidebar";
import useDropdown from "../hook/useDropdown";
import GradeModal from "../component/GradeModal";
import "../style/home.css";
import NoteModal from "../component/NoteModal";
import AbsenceModal from "../component/AbsenceModal";

function Home() {
  const [{ user }, setUser] = useContext(UserContext);
  const [subjects, setSubjects] = useState(null);
  const [notes, setNotes] = useState(null);
  const [absences, setAbsences] = useState(null);

  const Dropdown = useDropdown(
    [
      {
        optionName: "Opções",
        handleClick: null,
      },
      {
        optionName: "Sair",
        handleClick: () => setUser(null),
      },
    ],
    "home-dropdown"
  );

  return (
    <div className="page home">
      <GradeModal subjects={subjects} setSubjects={setSubjects} />
      <NoteModal notes={notes} setNotes={setNotes} />
      <AbsenceModal absences={absences} setAbsences={setAbsences} />
      <header className="header">
        <Dropdown />
      </header>
      <main className="main">
        <div className="main-news">
          <h1>Hack sweet beast</h1>
          <p>
            Demand to be let outside at once, and expect owner to wait for me as
            i think about it. Stuff and things shake treat bag. Fight own tail
            fight an alligator and win loves cheeseburgers knock over christmas
            tree. Chase imaginary bugs lick face hiss at owner, pee a lot, and
            meow repeatedly scratch at fence purrrrrr eat muffins and poutine
            until owner comes back.
          </p>
        </div>
        <div className="side-news-a">
          <h1>Enslave the hooman meow meow</h1>
        </div>
        <div className="side-news-b">
          <h1>Then cats take over the world</h1>
        </div>
      </main>
      <Sidebar
        students={user.students}
        setSubjects={setSubjects}
        setNotes={setNotes}
        setAbsences={setAbsences}
      />
      <footer className="footer"></footer>
    </div>
  );
}

export default Home;
