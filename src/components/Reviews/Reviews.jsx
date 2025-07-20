import React from "react";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    review:
      "This course completely transformed my career. The instructors are knowledgeable and supportive!",
  },
  {
    id: 2,
    name: "Michael Smith",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 4,
    review:
      "Great content and practical projects. I appreciated the hands-on approach and real-world examples.",
  },
  {
    id: 3,
    name: "Sophia Lee",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    rating: 5,
    review:
      "Amazing experience! The community and support made all the difference in my learning journey.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex space-x-1 text-yellow-400 ">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i < rating ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1
             1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1
              1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54
               1.118l-3.384-2.455a1 1 0 00-1.175 0l-3.384
                2.455c-.784.57-1.838-.196-1.539-1.118l1.286-3.97a1
                 1 0 00-.364-1.118L2.174 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1
                  1 0 00.95-.69l1.286-3.97z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className=" py-12 px-6 text-neutral-800 dark:text-neutral-100">
      <div className="max-w-7xl mx-auto text-center ">
        <h2 className="text-3xl font-bold text-white mb-8">
          What Our Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(({ id, name, avatar, rating, review }) => (
            <div
              key={id}
              className=" rounded-lg p-6 flex flex-col items-center shadow-lg"
            >
              <img
                src={avatar}
                alt={`${name}'s avatar`}
                className="w-20 h-20 rounded-full mb-4 ring-2 ring-indigo-500"
              />
              <StarRating rating={rating} />
              <p className=" italic mt-4 text-center">"{review}"</p>
              <h3 className=" font-semibold mt-4">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
