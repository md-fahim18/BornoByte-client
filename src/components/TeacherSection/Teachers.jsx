import { useEffect, useState } from "react";
import Teacher from "./Teacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch("Teachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl text-center"> Meet Our Instructors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 mb-5 gap-3 w-full">
        {teachers.map((teacher) => {
          if (["01", "02", "03"].includes(teacher.id))
            return <Teacher teacher={teacher}></Teacher>;
        })}
      </div>
    </div>
  );
};

export default Teachers;
