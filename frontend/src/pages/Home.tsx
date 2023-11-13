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
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      {/* AI Interviewer Section */}
      <div className="w-full p-8 bg-black shadow-md rounded-md text-white mb-6 flex flex-col items-center">
        <div className="mb-6">
          {/* <img
            src="https://huru.ai/wp-content/uploads/2023/05/HURU-LOGO.webp"
            alt="Interview AI Logo"
            className="h-16 w-auto"
          /> */}
        </div>

        <h1 className="text-3xl font-bold mb-6">Welcome to AI Interviewer</h1>

        <p className="mb-4 text-lg"> {/* Increase font size */}
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
          <p className="text-xl md:text-2xl mb-4"> {/* Increase font size */}
            Smart Video Interview Software To Boost Efficiency Of Your Hiring Experts
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up
          </button>
        </div>
      </div>      

     {/* Testimonial section  */}

     <div className="w-11/12 p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
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
            name="Jane Smith"
            position="Full Stack Developer"
            text="I love the variety of technology-specific questions available on Interview AI. It has helped me brush up on my skills and feel more confident during interviews."
            image="https://assets.nicepagecdn.com/11a8ddce/96126/images/pexels-photo-555790.jpg"
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
        className="w-20 h-20 mx-auto mb-4 "
      />
      <p className="text-lg font-bold">{name}</p>
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
