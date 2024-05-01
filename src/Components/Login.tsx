import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface LoginForm {
  getEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  getName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Login = ({ getEmail, getPassword, handleSubmit, getName }: LoginForm) => {
  const [existingUser, setExistingUser] = useState(true);

  //const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await handleSubmit(e);
  };
  return (
    <>
      <div className="row justify-content-center text-center text-primary-emphasis">
        <div className="col-12 col-md-6">
          <h2>
            Welcome to the Chatbot ! ,Here i am Sending API Requests to ChatGPT
            and the Response Fetched is shown as output
          </h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1>Login Form</h1>
          <form>
            <div className="mb-3">
              <div>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={getName}
                />
              </div>
            </div>
            <div className="mb-3">
              {!existingUser ? (
                <div>
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={getEmail}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={getPassword}
              />
            </div>
            <div className="col-lg-12 d-flex justify-content-around">
              <ul className="list-unstyled">
                <li className="d-inline">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </li>
                <li className="d-inline">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setExistingUser(false);
                    }}
                  >
                    SignUp
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
