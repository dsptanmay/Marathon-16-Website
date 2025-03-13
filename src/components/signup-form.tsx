import React from "react";

function SignUpForm() {
  return (
    <form className="flex flex-col items-center">
      <h1>SignUpForm</h1>
      <input
        type="text"
        className="px-5 w-full py-6"
        placeholder="Some input"
      />
    </form>
  );
}

export default SignUpForm;
