import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider"; // adjust if needed

const useTeacher = () => {
  const { user } = useAuth(); // assumes your AuthProvider gives current user info
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/teacher/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsTeacher(data.teacher);
          setLoading(false);
        });
    }
  }, [user?.email]);

  return [isTeacher, loading];
};

export default useTeacher;
