import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, TicketPlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { images } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useClerk();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theaters", path: "/theaters" },
    { name: "Release", path: "/release" },
    { name: "Favourite", path: "/favorites" },
  ];

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-32 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-black/80 backdrop-blur-lg"
            : "py-4 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/">
              <img src={images.logo} className="w-32 h-auto" />
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:flex border border-white/15 backdrop-blur-lg bg-black/10 rounded-full px-8 py-4 gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className="text-white font-medium text-sm relative group hover:text-primary transition-all duration-300"
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                    initial={{ width: 0 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <motion.div
              className="p-2 rounded-full hover:bg-gray-800 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search color="#ffffff" strokeWidth={2} size={24} />
            </motion.div>

            {/* Login Button */}
            {user ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Booking"
                    labelIcon={<TicketPlus />}
                    onClick={() => navigate("/myBooking")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <motion.button
                onClick={() => openSignIn()}
                className="bg-gradient-to-tl from-[#9929EA] to-[#7210b8] duration-500 transition-colors cursor-pointer px-8 py-2.5 rounded-lg font-medium text-sm hidden sm:block"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#FF3860",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            )}
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu color="#ffffff" strokeWidth={1.5} size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end">
                <motion.button
                  className="p-2 rounded-full hover:bg-gray-800 mb-8"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X color="#ffffff" strokeWidth={1.5} size={28} />
                </motion.button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-8">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className="text-white text-2xl font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Login Button */}
                <motion.button
                  className="bg-primary hover:bg-secondary duration-500 transition-colors cursor-pointer px-8 py-3 rounded-lg font-medium text-lg mt-8"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#FF3860", // secondary color
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Login
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
