import { useState } from "react";

const TeacherProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const teacher = {
    name: "Dr. Sarah Ahmed",
    title: "Senior Lecturer, Data Science",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: `Dr. Sarah Ahmed is a seasoned Data Scientist with over 12 years of experience in AI, Machine Learning, and Data Analytics. She has mentored thousands of students and professionals across the globe.`,
    experience: "12+ years of teaching and industry experience",
    specialties: [
      "Machine Learning",
      "Python",
      "Deep Learning",
      "Data Analysis",
    ],
    social: {
      linkedin: "https://linkedin.com/in/sarahahmed",
      website: "https://sarahsclassroom.com",
    },
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        See Profile
      </button>

      {isOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-5xl w-full bg-base-100 text-base-content rounded-xl p-8">
            {/* Close Button */}
            <form method="dialog">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-xl"
              >
                ✕
              </button>
            </form>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-primary shadow-md"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold">{teacher.name}</h2>
                  <p className="text-sm opacity-70 mt-1">{teacher.title}</p>
                </div>

                <p className="text-sm leading-relaxed">{teacher.bio}</p>

                <div className="text-sm">
                  <span className="font-semibold">Experience:</span>{" "}
                  {teacher.experience}
                </div>

                <div className="text-sm">
                  <span className="font-semibold">Specialties:</span>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    {teacher.specialties.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-4">
                  <a
                    href={teacher.social.linkedin}
                    className="btn btn-sm btn-outline btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={teacher.social.website}
                    className="btn btn-sm btn-outline btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="modal-backdrop bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        </dialog>
      )}
    </>
  );
};

export default TeacherProfile;
