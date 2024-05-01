import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import Chatbot from "./Components/Chatbot";

function App() {
  const [PageName, setPageName] = useState("Login Page");
  const [passWord, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [pathOptions, setPathOptions] = useState("");

  const navigate = useNavigate();

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    email === "" ? await generateToken() : await handleAddUser();
  };

  const handleAddUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: passWord,
        email: email,
        roles: "ROLE_USER",
      }),
    };
    console.log(requestOptions.body);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/addNewUser",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseBody = await response.text();
      setToken(responseBody);
      console.log(`User added successfully: ${responseBody}`);
    } catch (err) {
      console.log(`Error: ${(err as Error).message}`);
    }
  };

  const generateToken = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: passWord,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/generateToken",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseBody = await response.text();
      setToken(responseBody);
      console.log({ token: responseBody });
    } catch (err) {
      console.log(`Error: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    console.log(pathOptions);
  }, [pathOptions]);

  useEffect(() => {
    console.log(token);
    if (token) navigate("/ChatBot");
    // if (token) {
    //   // Navigate to Chatbot if token is valid
    //   navigate('/Chatbot');
    // } else {
    //   // Set error message if token is invalid
    //   setErrorMessage('Invalid login. Please check your credentials.');
  }, [token]);
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <div>
        <Navbar
          PageName={PageName}
          setPageName={setPageName}
          setToken={setToken}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Login
                getEmail={handleEmailInputChange}
                getPassword={handlePasswordInputChange}
                handleSubmit={handleSubmit}
                getName={handleNameChange}
              />
            }
          />
          <Route path="/Chatbot" element={<Chatbot token={token} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
