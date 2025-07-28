import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaLightbulb, FaRocket, FaTools } from "react-icons/fa";
import sscImg from "../../assets/Image/About/ssc.jpg";
import hscImg from "../../assets/Image/About/hsc.jpg";
import undergradImg from "../../assets/Image/About/undergrad.jpg";
import skillImg from "../../assets/Image/About/skill.jpg";

const stats = [
  { label: "Expert Instructors", value: 10 },
  { label: "Active Students", value: 500 },
  { label: "Available Courses", value: 30 },
];

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <motion.div
        className="relative h-64 flex items-center justify-center text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="z-10 text-4xl sm:text-5xl font-bold text-center">About bornoByte</h1>
      </motion.div>

      <div className="p-4 sm:p-8 max-w-6xl mx-auto">
        {/* Who We Are */}
        <motion.section
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Who We Are</h2>
          <p className="text-lg max-w-3xl mx-auto">
            bornoByte is a modern platform making learning accessible, flexible, and affordable.
            Whether you're just starting or looking to upskill, we provide high-quality courses
            tailored to your academic and career goals.
          </p>
        </motion.section>

        {/* What We Offer */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold text-center text-orange-500 mb-10">
            What We Offer
          </h3>
          <div className="space-y-12">
            {[
              {
                title: "SSC Program",
                icon: <FaGraduationCap className="text-orange-500 text-2xl mb-2" />,
                img: sscImg,
                desc:
                  "Build your foundation in key subjects with fun tutorials, animations, and real-world examples to level up your learning.",
              },
              {
                title: "HSC Program",
                icon: <FaLightbulb className="text-purple-500 text-2xl mb-2" />,
                img: hscImg,
                desc:
                  "Master concepts, boost confidence, and prepare for varsity admission with smart content and peer challenges.",
              },
              {
                title: "Undergraduate",
                icon: <FaRocket className="text-green-500 text-2xl mb-2" />,
                img: undergradImg,
                desc:
                  "Get job-ready skills in tech and business with project-based learning designed for future innovators.",
              },
              {
                title: "Skill Development",
                icon: <FaTools className="text-yellow-500 text-2xl mb-2" />,
                img: skillImg,
                desc:
                  "Explore coding, freelancing, design, and communication skills that prepare you for real-world challenges and freelance markets.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-6 bg-base-200 shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image with circle frame */}
                <div className="min-w-[180px] w-[180px] h-[180px] relative rounded-full overflow-hidden ring-4 ring-offset-2 ring-orange-400">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-base-content mb-2">{item.title}</h4>
                  <p className="text-base text-base-content/80 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Platform Highlights with Animated Counters */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-base-200 rounded shadow p-6 hover:scale-105 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.h2 className="text-3xl font-bold text-orange-500">
                <AnimatedNumber value={stat.value} />+
              </motion.h2>
              <p className="mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Join Us Today</h2>
          <p className="mb-6">
            Start learning and unlock your full potential with bornoByte.
          </p>
          <Link to="/courses">
            <button className="bg-orange-500 text-xl font-bold text-white px-6 py-3 rounded-3xl hover:bg-orange-600 transition">
              Explore Courses
            </button>
          </Link>
        </motion.section>

        {/* Footer-style CTA Buttons */}
        <motion.section
          className="bg-base-200 p-6 rounded-md shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.section>
      </div>
    </div>
  );
};

// 🔢 Animated Number Counter
const AnimatedNumber = ({ value }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMilSecDur = 1000;
    let incrementTime = (totalMilSecDur / end) * 2;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [value]);

  return <span>{count}</span>;
};

export default About;
