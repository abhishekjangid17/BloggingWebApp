import React from 'react';
import aboutImg from "../assets/About-blog.avif"

const About = () => {
  return (
    <div className=" min-h-screen pt-28 px-4 md:px-0 mb-7 ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="md:text-5xl text-4xl font-extrabold  mb-4">
            About Our Blog
          </h1>
          <p className="text-lg ">
            A place to share thoughts, inspire others, and grow together.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <img
            src={aboutImg}
            alt="Blog Illustration"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />
          <div>
            <p className=" text-lg mb-4">
              Welcome to our Blog App! We created this platform for readers,
              writers, and thinkers to connect through stories, tutorials, and
              creative insights. Whether you're a passionate blogger or someone
              who loves reading, this space is built for you.
            </p>
            <p className=" text-lg mb-4">
              Our mission is to empower individuals to express themselves freely.
              We offer simple tools to write, publish, and engage with others in
              meaningful ways.
            </p>
            <p className=" text-lg">
              Thank you for being a part of our growing community.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic text-gray-500">
            "Words are powerful. Use them to inspire."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;
