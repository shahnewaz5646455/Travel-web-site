import React from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { FaShieldAlt, FaUsers, FaGlobe, FaClock, FaSmileBeam } from 'react-icons/fa';

const features = [
  { icon: <FaShieldAlt />, title: 'Trusted & Secure' },
  { icon: <FaUsers />, title: 'Expert Tour Guides' },
  { icon: <FaGlobe />, title: 'Global Destinations' },
  { icon: <FaClock />, title: '24/7 Support' },
  { icon: <FaSmileBeam />, title: 'Unforgettable Memories' },
];

export default function WhyChooseUs() {
  // Infinite horizontal scroll animation
  const marqueeAnimation = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
    loop: true,
    config: { duration: 15000 },
  });

  return (
    <section className=" py-20 px-6 sm:px-10 font-inter">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Why Choose Us</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the reasons why thousands of travelers trust us with their journeys around the globe.
        </p>
      </div>

      {/* Animated Marquee */}
      <div className="overflow-hidden relative p-3">
        <animated.div
          style={marqueeAnimation}
          className="flex gap-10 whitespace-nowrap items-center"
        >
          {[...features, ...features].map((feature, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 h-40 bg-transparent  rounded-xl p-6 flex flex-col justify-center items-center border-2 border-black hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl text-black mb-3">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
            </div>
          ))}
        </animated.div>
      </div>
    </section>
  );
}
