import React from "react";
import JobUploadForm from "./_components/JobUploadForm";

const UploadPage = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Upload Your CV</h1>
      <JobUploadForm />
    </div>
  );
};

export default UploadPage;
