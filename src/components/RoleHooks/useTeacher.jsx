import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../Auth/AuthContext";
import useAxiosSecure from "../Auth/useAxiosSecure";

const useTeacher = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isTeacher, isLoading: teacherLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['isTeacher', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user.email}`);
      return res.data.teacher;
    }
  });

  return [isTeacher, teacherLoading];
};

export default useTeacher;
