import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaEnvelope,
  FaLinkedin,
  FaBook,
  FaLink,
  FaInfoCircle,
} from "react-icons/fa";

const Teacher = ({ teacher }) => {
  const {
    name,
    title,
    education,
    experience,
    image,
    email,
    linkedin,
    coursesLink,
    course,
    bio,
  } = teacher;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-neutral-800 dark:text-neutral-100 h-full">
      {/* Card */}
      <div className="card-body flex flex-col justify-between max-w-sm mx-auto bg-base-100 rounded-3xl shadow-2xl p-10 hover:shadow-2xl transition duration-300 h-full gap-3">
        <div className="flex flex-col items-center text-center">
          <img
            src={image}
            alt="Instructor"
            className="w-24 h-24 rounded-full border-4 border-primary shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-base-content">{name}</h2>
          <p className="text-sm mb-4">{title}</p>
        </div>

        <div className="text-left text-sm text-base-content space-y-2 mt-2">
          <p>
            <FaGraduationCap className="inline text-primary mr-2" />
            <span className="font-semibold">Education:</span> {education}
          </p>
          <p>
            <FaBriefcase className="inline text-primary mr-2" />
            <span className="font-semibold">Experience:</span> {experience}
          </p>
        </div>

        <div className="mt-4 flex space-x-4 text-sm card-actions justify-start">
          <button
            className="btn w-full border-blue-800 hover:bg-blue-800 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            See profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-4xl w-full bg-base-100 text-base-content rounded-xl p-8">
            <form method="dialog">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-xl"
              >
                ✕
              </button>
            </form>

            <div className="flex flex-col md:flex-row items-start gap-8">
              <img
                src={image}
                alt={name}
                className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-primary shadow-md"
              />

              <div className="flex-1 space-y-3 text-sm">
                <h2 className="text-3xl font-bold">{name}</h2>
                <p className="text-primary">{title}</p>

                <p>
                  <FaGraduationCap className="inline text-primary mr-2" />
                  <span className="font-semibold">Education:</span> {education}
                </p>
                <p>
                  <FaBriefcase className="inline text-primary mr-2" />
                  <span className="font-semibold">Experience:</span>{" "}
                  {experience}
                </p>
                <p>
                  <FaEnvelope className="inline text-primary mr-2" />
                  <span className="font-semibold">Email:</span> {email}
                </p>
                <p>
                  <FaLinkedin className="inline text-primary mr-2" />
                  <span className="font-semibold">LinkedIn:</span>{" "}
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    View Profile
                  </a>
                </p>
                <p>
                  <FaBook className="inline text-primary mr-2" />
                  <span className="font-semibold">Course:</span> {course}
                </p>
                <p>
                  <FaLink className="inline text-primary mr-2" />
                  <span className="font-semibold">Courses Link:</span>{" "}
                  <Link to={coursesLink} className="link link-secondary">
                    See All Courses
                  </Link>
                </p>
                <p>
                  <FaInfoCircle className="inline text-primary mr-2" />
                  <span className="font-semibold">Bio:</span> {bio}
                </p>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        </dialog>
      )}
    </div>
  );
};

export default Teacher;
