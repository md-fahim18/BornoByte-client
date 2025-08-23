import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
const ContactUs = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-16">
        <form
          action="https://formsubmit.co/bornobyte@gmail.com"
          method="POST"
          className="w-full max-w-lg bg-base-100 p-8 rounded-lg shadow space-y-4 text-neutral-800 dark:text-neutral-100"
        >
          {/* Required hidden fields */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_autoresponse"
            value="Thanks for contacting us. We’ll get back to you soon!"
          />
          {/* optional: redirect after submit */}
          {/* <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" /> */}

          <h2 className="text-3xl font-bold text-center text-important-text dark:text-important-text-dark">
            Contact Us
          </h2>

          <div>
            <label className="label">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Your Email</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <button type="submit" className="btn bg-primary dark:bg-primary text-white dark:text-white w-full hover:scale-105 hover:shadow-2xl">
            Send Message
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
