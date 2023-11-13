import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdRemove } from 'react-icons/md';
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      {/* AI Interviewer Section */}
      <div className="w-full p-8  shadow-md rounded-md text-white mb-6 flex flex-col items-center">
        {/* <div className="mb-6">
          <img
            src="https://huru.ai/wp-content/uploads/2023/05/HURU-LOGO.webp"
            alt="Interview AI Logo"
            className="h-16 w-auto"
          />
        </div> */}

        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6 dark:text-white text-center">Welcome to AI Interviewer</h1>

        <p className="mb-4 text-lg max-w-3xl mx-auto dark:text-slate-400 text-center"> {/* Increase font size */}
          Are you ready to ace your next job interview? Interview AI is here to help you prepare
          and succeed in your career journey.
        </p>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Get Started
        </button>
      </div>

      {/* Image and Description Section (Side-by-Side) */}
      <div className="w-full p-8 text-white flex flex-col md:flex-row items-center">
        <div className="mb-6 md:mr-6 w-full md:w-6/12">
          <img
            src="https://cdn-ddhbi.nitrocdn.com/oQUUkmjvDPdPLvhisuibbubwHakMrNcj/assets/images/optimized/rev-8524287/interviewer.ai/wp-content/uploads/2021/11/Rectangle-575-1.jpg"
            alt="image1"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="w-full md:w-6/12">
          <p className="text-xl md:text-2xl mb-4 "> {/* Increase font size */}
            Smart Video Interview Software To Boost Efficiency Of Your Hiring Experts
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>      

     {/* Testimonial section  */}

     <div className="w-11/12 p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Testimonials</h2>
        <Slider {...settings}>
          <Testimonial
            name="John Doe"
            position="Software Engineer"
            text="Interview AI has been an invaluable resource for my interview preparation. The Real Interviewer AI feature provides a realistic experience, and the feedback is incredibly helpful."
            image="https://assets.nicepagecdn.com/11a8ddce/96126/images/pexels-photo-555790.jpg"
          />
          <Testimonial
            name="Jane Smith"
            position="Full Stack Developer"
            text="I love the variety of technology-specific questions available on Interview AI. It has helped me brush up on my skills and feel more confident during interviews."
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpXdd1Ez0ZE3WA5gg7LFlYL0ZKq1eWJJIXOLF2zrAZ0Xi4kCGS"
          />
          <Testimonial
            name="Alex Rodriguez"
            position="Software Engineer"
            text="Interview AI is a must-have tool for every software engineer. The real-time coding environment and detailed feedback have been invaluable in refining my coding skills. I highly recommend it to anyone serious about acing technical interviews."
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTREGxaTu-41aJR5JzaqH3smZQ0BE82n50cMikGkJw-AohpSHfwKZ0alFxYNXWFgInNRek&usqp=CAU"
           />
           <Testimonial
            name="Sarah Chang"
            position="Frontend Developer"
            text="AI Interviewer has been my go-to resource for frontend interview preparation. The interactive coding challenges and detailed explanations have not only improved my technical skills but also boosted my confidence in tackling complex problems during interviews."
            image="data:image/jpeg;base64,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"
           />
           <Testimonial
           name="Wanda Harleen"
           position="DevOps Engineer"
           text="Navigating the world of DevOps interviews can be challenging, but Interview AI has made it much smoother. The platform's comprehensive coverage of DevOps concepts and hands-on exercises has been instrumental in my interview success. I'm grateful for this resource."
           image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-7pxe72bhO0n8Kn2m9KR5X0TPb-Nn4dWds1MYxrLfCmjP9ftHhTXkMhcS0ZBkzYBL4E&usqp=CAU"
          />
        </Slider>
      </div>


      {/* //////////// */}

      {/* FAQs Section (Accordion) */}
      <div className="w-full p-8 mt-4">
        <h2 className="text-white text-2xl font-bold mb-4 ">Frequently Asked Questions</h2>

        {/* FAQ 1 */}
        <Accordion title="How can I access the Real Interviewer AI?">
          Simply log in to your account, and you'll find the Real Interviewer AI feature in the Interview section. Click on the corresponding option to start your interview session.
        </Accordion>

        {/* FAQ 2 */}
        <Accordion title="Is the website completely free to use?">
          Yes, Interview AI is entirely free and open-source. We believe in providing valuable resources to help you succeed in your MERN, Java, and Node interviews without any cost.
        </Accordion>

        {/* FAQ 3 */}
        <Accordion title="How do I receive feedback after the interview?">
          After completing the interview with the Real Interviewer AI, you'll receive detailed feedback on your performance. The feedback will be available in the Interview History section of your profile.
        </Accordion>

        {/* FAQ 4 */}
        <Accordion title="Can I practice specific technology-related questions?">
          Certainly! Our platform covers a wide range of technology-specific questions for MERN, Java, and Node interviews. You can choose specific categories or topics to focus on during your practice sessions.
        </Accordion>

        {/* FAQ 5 */}
        <Accordion title="Do I need to register to access the interview features?">
          Yes, registration is required to access the full range of interview features. It allows you to track your progress, save your interview history, and receive personalized recommendations to improve your skills.
        </Accordion>
      </div>
    </div>
  );
};

interface TestimonialProps {
  name: string;
  position: string;
  text: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, position, text, image }) => {
  return (
    <div className="text-center">
      <img
        src={image}
        alt={`Testimonial by ${name}`}
        className="w-2/12 mx-auto mb-4 "
      />
      <p className="text-lg font-bold text-gray-300">{name}</p>
      <p className="text-gray-500">{position}</p>
      <p className="text-gray-300 mt-2">{text}</p>
    </div>
  );
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 p-3 rounded-md text-left focus:outline-none flex items-center"
      >
        <span className="text-white font-bold flex-grow">{title}</span>
        {isOpen ? (
          <MdRemove className="h-5 w-5 text-white" />
        ) : (
          <MdAdd className="h-5 w-5 text-white" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 ml-4 text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default Home;
