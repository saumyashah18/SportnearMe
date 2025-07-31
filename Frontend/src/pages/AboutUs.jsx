import React from "react";
import { motion } from "framer-motion";


export default function AboutUs() {
  return (
    <div className="bg-[#1e293b] text-white min-h-[300vh] w-full font-sans">
      {/* Section 1: Problem */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Finding a Turf Was Frustrating
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl max-w-2xl"
        >
          Endless Google searches, outdated contact numbers, no availability info — we’ve all been there.
        </motion.p>
      </section>

      {/* Section 2: Inspiration */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Inspired by BookMyShow
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl max-w-2xl"
        >
          Just like how BookMyShow made entertainment bookings seamless, we dreamt of doing the same for sports.
        </motion.p>
      </section>

      {/* Section 3: Our Mission */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          SportNearMe Was Born
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl max-w-2xl"
        >
          To help players find, book, and play — effortlessly. Wherever you are, whenever you want.
        </motion.p>
      </section>

      {/* Section 4: Our Team */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-10"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Suraj */}
          <div className="bg-white text-[#1e293b] rounded-lg shadow-lg p-6">
            <img
              src="/images/Suryaraj.png"
              alt="Suraj"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Suryaraj Jadeja</h3>
            <p className="text-sm font-medium">MERN Stack Developer</p>
            <p className="text-sm mt-2">
              Passionate about clean code and fast experiences. Leads the product's technical vision.
            </p>
          </div>

          {/* Saumya */}
          <div className="bg-white text-[#1e293b] rounded-lg shadow-lg p-6">
            <img
              src="/images/.png"
              alt="Saumya"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Saumya Shah</h3>
            <p className="text-sm font-medium">MERN Stack Developer</p>
            <p className="text-sm mt-2">
              Handles UI/UX and backend APIs. Loves sports and fast databases.
            </p>
          </div>

          {/* Om  */}
          <div className="bg-white text-[#1e293b] rounded-lg shadow-lg p-6">
            <img
              src="/images/IMG5C0"
              alt="Om"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Om Patel</h3>
            <p className="text-sm font-medium">Support & Algorithm</p>
            <p className="text-sm mt-2">
              Powers search & rankings. Ensures users find the best turf every time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
