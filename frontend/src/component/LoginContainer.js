import React, { useState, useContext } from "react";
import useError from "../hook/useError";
import { useHistory, useParams } from "react-router-dom";
import api from "../utils/api";
import "../style/loginForm.css";
import UserContext from "../utils/userContext";

export default function LoginForm() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useError();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext);
  const browserHistory = useHistory();
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    api
      .get(`/user/authenticate`, { auth: { username: cpf, password } })
      .then(({ data }) => {
        const { token, id, type } = data;

        if (data.error) {
          setError(data.error);
          setPassword("");
        } else {
          if (type === "Responsável") {
            api
              .get(`/parent/find/${id}`, {
                headers: { Authorization: token },
              })
              .then(({ data }) => {
                setUser({ token, user: data.parent });
                browserHistory.replace("/");
              });
          }
        }
      })
      .catch(() => {
        setError("Erro na rede, tente novamente.");
      });
  }

  return (
    <div className="login-container">
      <Error />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          required
          minLength="11"
          maxLength="11"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          onClick={() => setError("")}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          required
          minLength="8"
          maxLength="20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setError("")}
        />
        <button type="submit" name="enviar">
          Login
        </button>
      </form>

      <div className="register-section">
        <span>Não possui uma senha?</span>
        <button id="register-btn" name="cadastrar">
          Cadastre-se
        </button>
      </div>
    </div>
  );
}
