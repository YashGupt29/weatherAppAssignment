import React from "react";
//Component for testing error boundary
const ProblemChild: React.FC = () => {
  throw new Error("I crashed!");
};

export default ProblemChild;
