import React, { useState } from "react";

const RequestContent = () => {
  const [error, setError] = useState("");

  return (
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSeaoM7F-sKN-zYQz-Qn6xtzrBkJBB3SufB14R6SzamV0FzPmA/viewform?embedded=true"
      height="1186"
    >
      Loading…
    </iframe>
  );
};

export default RequestContent;
