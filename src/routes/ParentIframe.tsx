import * as React from "react";

const ParentIframe = (): JSX.Element => {
  const iFrameRef = React.useRef<HTMLIFrameElement>(null);
  const [message, setMessage] = React.useState("");

  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow?.postMessage("Hello there childing!");
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
      <h1>Parent Iframe</h1>
      <button onClick={sendMessage}>Send message to Child</button>
      <br />
      {message}
      <br />
      <br />
      <iframe
        ref={iFrameRef}
        src="/iframe-child"
        width="600"
        height="300"
        title="Child iFrame"
      ></iframe>
    </>
  );
};

export default ParentIframe;
