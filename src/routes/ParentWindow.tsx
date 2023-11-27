import * as React from "react";

const ParentWindow = (): JSX.Element => {
  const [message, setMessage] = React.useState("");
  const childWindow = React.useRef<any>(null);

  const sendMessage = () => {
    if (!childWindow.current) return;
    childWindow.current.postMessage("Hi child window!");
  };

  const openWindow = () => {
    childWindow.current = window.open(
      "http://localhost:5173/window-child",
      "childWindow",
      "width=500,height=500"
    );
  };

  React.useEffect(() => {
    window.addEventListener("message", function (e) {
      console.info("listened in parent and got ---> ", { e_data: e.data });
      if (e.origin !== "http://localhost:5173") return;
      setMessage(`Got the following message from CHILD: ${e.data}`);
    });
    return () => {
      window.removeEventListener("message", () => {
        console.info("removing event listener in ChildIframe");
        setMessage("");
      });
    };
  }, []);
  return (
    <>
      <h1>Parent Window</h1>
      <button onClick={sendMessage}>Send message to Child</button>
      <br />
      {message}
      <br />
      <br />
      <button onClick={openWindow}>Open window</button>
    </>
  );
};

export default ParentWindow;
