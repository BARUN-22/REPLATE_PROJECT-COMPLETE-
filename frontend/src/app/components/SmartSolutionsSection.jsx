import React from "react";

const SmartSolutionsSection = () => {
  return (
    <section className="flex justify-center items-center py-16 px-4">
      <div className="bg-green-200 max-w-4xl rounded-xl p-10 text-center shadow-md">
        <h2 className="text-3xl font-bold text-white mb-6">
          Smart Solutions with AI
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed">
          Our AI-driven system optimizes food redistribution by tracking surplus in real time, 
          connecting donors with recipients efficiently, and providing smart insights for 
          sustainable food management. It ensures minimal waste and maximum impact, 
          making food sharing smarter and more effective.
        </p>
      </div>
    </section>
  );
};

export default SmartSolutionsSection;