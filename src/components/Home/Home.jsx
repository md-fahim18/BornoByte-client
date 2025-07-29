import React from "react";
import MySlider from "../Slider/Slider";

import CourseSection from "../CourseSection/courSec";

import Courses from "../Courses/Courses";
import ChooseUs from "../ChooseUS/ChooseUs";
import Faq from "../FAQ/Faq";
import FeaturedCourses from "../FeaturedCourse/FeaturedCourse"; // Adjust path if needed
import Teacher from "../TeacherSection/Teacher";
import Teachers from "../TeacherSection/Teachers";
import Reviews from "../Reviews/Reviews";
import HomepageCourses from "../Layout/DashBoard/AdminDash/HomePageCourseSec/HomepageCourses";

const Home = () => {
  return (
    <div>
      <MySlider></MySlider>
      <CourseSection></CourseSection>
      <FeaturedCourses></FeaturedCourses> {/* Featured Courses Section */}
      {/* <Courses></Courses> */}
      <HomepageCourses></HomepageCourses>
      <Teachers></Teachers>
      <Reviews></Reviews>
      <ChooseUs></ChooseUs>
      <Faq></Faq>
    </div>
  );
};

export default Home;
