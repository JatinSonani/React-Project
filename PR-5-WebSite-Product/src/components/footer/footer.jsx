import { Container, Row, Col } from "react-bootstrap";
import { RiMailSendLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper"> {/* New wrapper class */}
      {/* <Container > */}
        <div className="footer-container">
        <Row className="footer-content">
          {/* Company Info */}
          <Col md={4} className="footer-section">
            <img
              src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/logo/logo.png"
              alt="Carrot"
              className="footer-logo"
            />
            <p className="footer-description">
              Carrot is the biggest market of grocery products. Get your daily
              needs from our store.
            </p>
            <div className="footer-contact">
              <GrLocation className="footer-icon" />
              <span>
                51 Green St. Huntington, Ohio Beach, Ontario, NY 11746 KY 4783,
                USA.
              </span>
            </div>
            <div className="footer-contact">
              <RiMailSendLine className="footer-icon" />
              <span className="footer-hover">example@email.com</span>
            </div>
            <div className="footer-contact">
              <IoCallOutline className="footer-icon" />
              <span className="footer-hover">+91 123 4567890</span>
            </div>
          </Col>

          {/* Company Links */}
          <Col md={2} className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li>About Us</li>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Contact Us</li>
              <li>Support Center</li>
            </ul>
          </Col>

          {/* Category Links */}
          <Col md={2} className="footer-section">
            <h4 className="footer-heading">Category</h4>
            <ul className="footer-links">
              <li>Dairy & Bakery</li>
              <li>Fruits & Vegetables</li>
              <li>Snacks & Spices</li>
              <li>Juice & Drinks</li>
              <li>Chicken & Meat</li>
              <li>Fast Food</li>
            </ul>
          </Col>

          {/* Newsletter Subscription */}
          <Col md={4} className="footer-section">
            <h4 className="footer-heading">Subscribe to Our Newsletter</h4>
            <input
              type="text"
              placeholder="Enter your email..."
              className="footer-input"
            />
            <div className="footer-social-icons d-block">
              <FaFacebookF className="social-icon" />
              <FaTwitter className="social-icon" />
              <FaInstagram className="social-icon" />
              <div className="footer-img-container">
                <img
                  src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/insta/1.jpg"
                  alt="insta1"
                  className="footer-img"
                />
                <img
                  src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/insta/2.jpg"
                  alt="insta2"
                  className="footer-img"
                />
                <img
                  src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/insta/3.jpg"
                  alt="insta3"
                  className="footer-img"
                />
                <img
                  src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/insta/4.jpg"
                  alt="insta4"
                  className="footer-img"
                />
                <img
                  src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/insta/5.jpg"
                  alt="insta5"
                  className="footer-img"
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          © 2025 <span className="footer-brand">Carrot</span>, All rights
          reserved.
        </div>
</div>
      {/* </Container> */}
    </footer>
  );
};

export default Footer;

