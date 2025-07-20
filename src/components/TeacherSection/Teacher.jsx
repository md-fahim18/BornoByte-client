const Teacher = ({ teacher }) => {
  const { name, title, education, experience, image } = teacher;
  return (
    <div className="text-neutral-800 dark:text-neutral-100 h-full">
      <div className=" card-body flex flex-col justify-between max-w-sm mx-auto bg-base-100 rounded-3xl shadow-2xl p-10 hover:shadow-2xl transition duration-300 h-full gap-3">
        <div className="flex flex-col items-center text-center">
          <img
            src={image}
            alt="Instructor"
            className="w-24 h-24 rounded-full border-4 border-primary shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-base-content">{name}</h2>
          <p className="text-sm  mb-4">{title}</p>
        </div>

        <div className="text-left text-sm text-base-content space-y-2 mt-2">
          {/* <p>
            <span className="font-semibold text-primary">📘 Course:</span>{" "}
            {course}
          </p> */}
          <p>
            <span className="font-semibold text-primary">🎓 Education:</span>{" "}
            {education}
          </p>
          <p>
            <span className="font-semibold text-primary">💼 Experience:</span>{" "}
            {experience}
          </p>
        </div>

        <div className="mt-4 flex space-x-4 text-sm card-actions justify-start ">
          <div className="btn w-full border-blue-800 hover:bg-blue-800 hover:text-white">
            See profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
