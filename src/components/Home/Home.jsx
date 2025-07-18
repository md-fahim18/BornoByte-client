import React from "react";
import MySlider from "../Slider/Slider";

import CourseSection from "../CourseSection/courSec";

import Courses from "../Courses/Courses";
import ChooseUs from "../ChooseUS/ChooseUs";
import Faq from "../FAQ/Faq";
import FeaturedCourses from "../FeaturedCourse/FeaturedCourse"; // Adjust path if needed

const Home = () => {
  return (
    <div>
      <MySlider></MySlider>
      <CourseSection></CourseSection>
      <FeaturedCourses></FeaturedCourses> {/* Featured Courses Section */}
      <Courses></Courses>
      <ChooseUs></ChooseUs>
      <Faq></Faq>
    </div>
  );
};

export default Home;
