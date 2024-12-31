import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import SSTextarea from "@/components/form/SSTextarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import contact from "../../assets/contact.jpg";
import { MdKeyboardArrowRight } from "react-icons/md";

const Contact = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="container min-h-screen bg-gradient-to-b from-white to-gray-50 py-6">
      <div className="w-full bg-gray-50 mb-6 px-4 py-6">
              <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
              <p className="flex items-center space-x-3text-md font-bold">
                <span>Home</span> <MdKeyboardArrowRight size={20} />{" "}
                <span className="text-primary">Contact</span>
              </p>
            </div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-secondary py-16 mt-4 mb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto ">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white ">
              Get in Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
              We're here to help and answer any questions you might have.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <MapPin className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">Mirpur 1 , Dhaka, Bangladesh</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Phone className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">+880 1339489483</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Mail className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">shop-saga@gmail.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Clock className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9AM - 6PM</p>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full">
          <div className="grid grid-cols-2 rounded-xl overflow-hidden shadow-xl bg-white">
            <div className="w-full p-8">
              <SSForm
                onSubmit={onSubmit}
                defaultValues={{
                  name: "",
                  email: "",
                  subject: "",
                  message: "",
                }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <div className="space-y-6">
                  <SSInput
                    width="max-w-full"
                    name="name"
                    type="text"
                    label="Your Name"
                  />
                  <SSInput
                    width="max-w-full"
                    name="email"
                    type="email"
                    label="Email Address"
                  />
                  <SSInput
                    width="max-w-full"
                    name="subject"
                    type="text"
                    label="Subject"
                  />
                  <SSTextarea
                    name="message"
                    label="Message"
                    width="max-w-full"
                    rows={3}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Send Message
                  </Button>
                </div>
              </SSForm>
            </div>

            <div className="hidden md:block">
              <img
                className="w-full h-full object-cover"
                src={contact}
                alt="Contact Us"
              />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 mb-10">
          <iframe
            className="w-full h-[400px] rounded-xl shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.702528983518!2d90.3435587004703!3d23.79456235824125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2sMirpur-1%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1735538455261!5m2!1sen!2sbd"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
