import React, { useRef } from "react";
import LandingPage from "./LandingPage";
import UIDesignGenerator from "./UIDesignGenerator";

export default function App() {
  const generatorRef = useRef(null);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Landing Page */}
      <LandingPage onEnter={scrollToGenerator} />

      
    </div>
  );
}
