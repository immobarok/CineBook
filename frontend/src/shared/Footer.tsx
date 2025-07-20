import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { images } from "../assets/assets";

interface FooterLink {
  title: string;
  links: string[];
}

const Footer: React.FC = () => {
  const footerLinks: FooterLink[] = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Contact Us", "Press"],
    },
    {
      title: "Support",
      links: ["FAQs", "Help Center", "Privacy Policy", "Terms of Service"],
    },
    {
      title: "Locations",
      links: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, name: "Facebook" },
    { icon: <Twitter size={18} />, name: "Twitter" },
    { icon: <Instagram size={18} />, name: "Instagram" },
    { icon: <Youtube size={18} />, name: "YouTube" },
    { icon: <Linkedin size={18} />, name: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 min-w-[240px]">
            <div className="flex items-center mb-2 -mt-3 -ml-4">
              <img src={images.logo} alt="" className="w-38 h-auto" />
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Your premier destination for movie tickets and cinematic
              experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors duration-300 p-1.5"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 flex-2 w-full">
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-3 min-w-[140px]">
                <h3 className="text-base font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-primary text-sm transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-3 flex-1 min-w-[240px]">
              <h3 className="text-base font-semibold text-white">Newsletter</h3>
              <p className="text-gray-400 text-sm">
                Get updates on new releases and offers.
              </p>
              <form className="flex flex-col space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary flex-1"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} CineBook. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
            <a
              href="#"
              className="text-gray-500 hover:text-primary text-xs md:text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary text-xs md:text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary text-xs md:text-sm transition-colors duration-300"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
