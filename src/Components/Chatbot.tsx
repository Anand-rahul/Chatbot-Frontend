import React, { useState } from "react";
interface chatbotProps {
  token: string;
}
const Chatbot = ({ token }: chatbotProps) => {
  const [ques, setQues] = useState("");
  const [output, Setoutput] = useState<string | null>(null);

  const handleQuestionChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQues(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await generateResponse(ques);
  };

  const generateResponse = async (question: string) => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + token,
      },
      body: JSON.stringify({
        ques: question,
      }),
    };
    console.log(requestOptions.headers.Authorization);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v2/Questions/Prompt",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseBody = await response.json();
      Setoutput(responseBody.prompt);
      console.log({ response: responseBody });
    } catch (err) {
      console.log(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Question
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Type your Question Here"
              onChange={handleQuestionChange}
            />
          </div>
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
          </ul>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Response....
            </label>
            <textarea
              className="form-control-plaintext"
              id="exampleFormControlTextarea1"
              rows={3}
              placeholder={output ?? "Get Your Answer Here"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
