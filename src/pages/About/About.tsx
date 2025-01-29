import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { leadersData, teamData } from "@/utils/aboutPageData";
import locationImg from "../../assets/location.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="md:container min-h-screen bg-gradient-to-b from-white to-gray-50 py-6">
      <div className="w-full bg-gray-50 mb-6 px-4 py-6">
        <h1 className="text-3xl font-bold text-primary mb-6">About</h1>
        <p className="flex items-center space-x-3text-md font-bold">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <MdKeyboardArrowRight size={20} />{" "}
          <span className="text-primary">About</span>
        </p>
      </div>

      {/* Mission Section */}
      <div className="px-4 md:px-0 py-10">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Collections
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              At Shop Saga, we are committed to bringing you a diverse selection
              of quality products at competitive prices. With a focus on
              customer satisfaction and innovative solutions, we aim to
              transform how you shop online.
            </p>
            <div className="mt-8">
              <img
                src="https://i.ibb.co/Y7F98Rf/aboutpng.webp"
                alt="E-Commerce"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 lg:mt-0">
            {[
              { title: "Quality Products", value: "10K+" },
              { title: "Happy Customers", value: "50K+" },
              { title: "Countries Served", value: "25+" },
              { title: "Years of Excellence", value: "10+" },
            ].map((stat) => (
              <Card
                key={stat.title}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <p className="text-3xl font-bold text-blue-600">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Leaders Section */}
      <div className="bg-white px-4 md:px-0 py-16">
        <div className="mx-auto ">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Meet Our Leaders
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadersData.map((leader, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-[300px] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-blue-200">{leader.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 px-4 md:px-0 py-16">
        <div className="mx-auto ">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {teamData.map((member, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="text-center"
              >
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src={member.userImg}
                    alt={member.userName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {member.userName}
                </h3>
                <p className="text-sm text-gray-500">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white px-4 py-16">
        <div className="mx-auto ">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Visit Our Headquarters
              </h2>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">
                      456 Shop Saga Blvd, Commerce City, CA 90001
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">
                      (987) 654-3210
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">
                      support@shopsaga.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="">
                <img
                  src={locationImg}
                  alt="Our Location"
                  className="max-h-[300px] rounded-xl ring-1 ring-gray-400/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
