import React from "react";

const team = [
  { name: "Abdul Kaium", role: "Founder & Visionary", img: "https://i.pravatar.cc/150?u=1" },
  { name: "Amina Rahman", role: "Head of Curriculum", img: "https://i.pravatar.cc/150?u=2" },
  { name: "Tanvir Hasan", role: "Tech Lead", img: "https://i.pravatar.cc/150?u=3" },
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
