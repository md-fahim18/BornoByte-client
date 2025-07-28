import React from "react";

const team = [
  { name: "Al Nahian Mugdho", role: "Founder & Visionary", img: "https://i.ibb.co/BHdgwtZ9/Al-Nahian-Mugdho.jpg" },
  { name: "Md Fahim", role: "Head of Curriculum", img: "https://i.ibb.co/dwPvBmRd/120-by-150.jpg" },
  { name: "Sk Md Abdul Kaium", role: "Tech Lead", img: "https://i.ibb.co/DfdJ21VT/DSC-3632-Copy-2.jpg" },
];

const Leadership = () => {
  return (
    <div className="bg-base-100 text-base-content p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Meet Our Leadership</h1>
      <p className="mb-8 text-lg">
        Our leadership is made of passionate educators, technologists, and creators driving change in education.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((leader, index) => (
          <div key={index} className="bg-base-200 p-4 rounded-lg shadow hover:scale-105 transition-transform text-center">
            <img
              src={leader.img}
              alt={leader.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-300"
            />
            <h3 className="text-xl font-semibold">{leader.name}</h3>
            <p className="text-sm text-orange-500">{leader.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
