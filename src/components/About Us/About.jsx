import React from "react";
import { Link } from "react-router-dom";
import sscImg from "../../assets/Image/About/ssc.jpg";
import hscImg from "../../assets/Image/About/hsc.jpg";
import undergradImg from "../../assets/Image/About/undergrad.jpg";
import skillImg from "../../assets/Image/About/skill.jpg";
import { FaGraduationCap, FaLightbulb, FaChalkboardTeacher, FaTools } from "react-icons/fa";

const stats = [
  { label: "Expert Instructors", value: "100+" },
  { label: "Active Students", value: "5000+" },
  { label: "Available Courses", value: "300+" },
];

const cards = [
  {
    title: "SSC Level",
    icon: <FaGraduationCap />,
    desc: "Our SSC track builds your foundation in key subjects with engaging tutorials, real-world examples, and mentorship to prepare you for the next academic steps.",
    img: sscImg,
  },
  {
    title: "HSC Level",
    icon: <FaLightbulb />,
    desc: "Get ahead with our HSC courses focusing on conceptual clarity, exam strategies, and university preparation — all in one platform.",
    img: hscImg,
  },
  {
    title: "Undergraduate",
    icon: <FaChalkboardTeacher />,
    desc: "Undergraduate learners can boost careers with job-ready skills in technology, business, and science — curated by real-world professionals.",
    img: undergradImg,
  },
  {
    title: "Skill Development",
    icon: <FaTools />,
    desc: "Skill Development programs include freelancing, coding, design, and communication — taught in simple, fun ways for all learners.",
    img: skillImg,
  },
];

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero */}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="z-10 text-4xl font-bold text-center">About bornoByte</h1>
      </div>

      <div className="p-4 sm:p-8 max-w-6xl mx-auto">
        {/* Who We Are */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Who We Are</h2>
          <p className="text-lg max-w-3xl mx-auto">
            bornoByte is a modern platform making learning accessible, flexible, and affordable.
            Whether you're just starting or looking to upskill, we provide high-quality courses
            tailored to your academic and career goals.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-center text-orange-500 mb-8">
            What We Offer
          </h3>
          <div className="space-y-12">
            {cards.map((card, index) => {
              const isImageLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row ${
                    !isImageLeft ? "md:flex-row-reverse" : ""
                  } items-center gap-6 bg-gradient-to-br from-base-200 to-base-100 dark:from-base-300 dark:to-base-100 border border-orange-400/30 rounded-xl shadow-xl p-4 md:p-6`}
                >
                  {/* Image Frame */}
                  <div className="relative w-full md:w-1/2 group">
                    <div className="relative p-2 rounded-xl border-4 border-orange-300 dark:border-orange-500 backdrop-blur-lg shadow-inner shadow-orange-100 dark:shadow-orange-900">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Text + Icon */}
                  <div className="w-full md:w-1/2 text-lg text-justify relative">
                    {/* Animated Icon */}
                    <div
                      className={`absolute ${
                        isImageLeft ? "right-0" : "left-0"
                      } top-0 text-orange-500 text-4xl animate-pulse drop-shadow-lg`}
                    >
                      {card.icon}
                    </div>
                    <p className="mt-12">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-base-200 dark:bg-base-300 rounded-lg shadow p-6 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-3xl font-bold text-orange-500">{stat.value}</h2>
              <p className="mt-2">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Join Us Today</h2>
          <p className="mb-6">
            Start learning and unlock your full potential with bornoByte.
          </p>
          <Link to="/courses">
            <button className="bg-orange-500 text-xl font-bold text-white px-6 py-3 rounded-3xl hover:bg-orange-600 transition">
              Explore Courses
            </button>
          </Link>
        </section>

        {/* Footer Buttons */}
        <section className="bg-base-200 dark:bg-base-300 p-6 rounded-md shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <Link to="/get-started">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Learn How to Get Started
            </button>
          </Link>
          <Link to="/join-team">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Join Our Team
            </button>
          </Link>
          <Link to="/blog">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Read Our Blog
            </button>
          </Link>
          <Link to="/leadership">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Meet Our Leadership
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
