import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-base-300 text-base-content">
      <div className="px-6 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-base-200 pb-8">
          {/* Column 1: Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-primary transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contactUs" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/terms-of-use" className="hover:text-primary transition">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-primary transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="p-2 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:bornobyte@gmail.com"
                  className="hover:text-primary transition"
                >
                  bornobyte@gmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href="tel:+8801234567890"
                  className="hover:text-primary transition"
                >
                  +880 1234-567890
                </a>
              </li>
              <li>
                <span className="font-semibold">Location:</span> Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-sm opacity-70 mt-6">
          &copy; {new Date().getFullYear()} BornoByte. All rights reserved.
        </div>
      </div>
    </footer>
  );

};

export default Footer;
