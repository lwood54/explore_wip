import * as React from "react";

const ChildIframe = (): JSX.Element => {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    window.addEventListener("message", function (e) {
      console.info("listened and got ---> ", { e_data: e.data });
      if (e.origin !== "http://localhost:5173") return;
      setMessage(`Got the following message from parent: ${e.data}`);
    });
    return () => {
      window.removeEventListener("message", () => {
        console.info("removing event listener in ChildIframe");
        setMessage("");
      });
    };
  }, []);

  const sendMessage = () => {
    window.parent.postMessage("sending to parent", "http://localhost:5173");
  };

  return (
    <>
      <h1>Child iFrame</h1>
      {message ? message : "nothing yet"}
      <br />
      <button onClick={sendMessage}>send message to parent</button>
    </>
  );
};

export default ChildIframe;
