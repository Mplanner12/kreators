import React from "react";

type SectionProps = {
  title: string;
  viewAll?: boolean;
  children: React.ReactNode;
};

const Sections = ({ title, viewAll = false, children }: SectionProps) => (
  <section className="mb-12">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {viewAll && (
        <button className="text-sm text-indigo-500 hover:underline">
          View all
        </button>
      )}
    </div>
    {children}
  </section>
);

export default Sections;
