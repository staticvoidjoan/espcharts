import Form from 'react-bootstrap/Form';
import "./Contact.css"
const  Contact() => {
  return (
    <div className="contact-form-container">
    <h2>Contact Us</h2>
    <form id="contact-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" rows="4" required></textarea>

      <button type="submit">Send Message</button>
    </form>
  </div>
);
}

export default Contact;