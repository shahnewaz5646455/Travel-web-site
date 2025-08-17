import { motion } from "framer-motion";

export default function DeveloperCard() {
  return (
    <motion.div
      className="bg-gradient-to-br from-white via-blue-50 to-white shadow-2xl border border-gray-100 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Text Section */}
      <div className="text-center md:text-left order-2 md:order-1">
        <motion.h2
          className="text-2xl lg:text-3xl font-extrabold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Shah Newaz
        </motion.h2>
        <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
          Front-End & MERN Stack Web Developer with 2+ years of experience in
          building interactive and scalable web apps.
        </p>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          Specialized in creating modern UI with{" "}
          <span className="font-semibold text-blue-700">React</span>,{" "}
          <span className="font-semibold text-cyan-600">TailwindCSS</span>,{" "}
          <span className="font-semibold text-yellow-600">Firebase</span>,{" "}
          <span className="font-semibold text-green-700">MongoDB</span>, and{" "}
          <span className="font-semibold text-indigo-700">JWT</span> for
          authentication.
        </p>
      </div>

      {/* Profile Image with Animated Dashed Border */}
      <motion.div
        className="relative flex justify-center md:justify-end order-1 md:order-2"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {/* Animated Dashed Border */}
        <motion.div
          className="absolute -inset-2 rounded-full border-2 border-dashed border-blue-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        ></motion.div>

        {/* Image */}
        <img
          className="rounded-full w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 object-cover shadow-lg border-4 border-white"
          src="https://i.postimg.cc/cHrxpwLz/PXL-20241124-124936993-PORTRAIT-2.jpg"
          alt="Shah Newaz"
        />
      </motion.div>
    </motion.div>
  );
}
