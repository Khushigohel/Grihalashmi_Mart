import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import '../../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container fluid className="footer-container">
        <Row>
          {/* About Section */}
          <Col md={4} sm={12}>
            <h5>About Grihalakshmi Mart</h5>
            <p>
              Grihalakshmi Mart is your trusted online store for quality products at the best prices. 
              We make shopping easy, fast, and enjoyable for every household.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} sm={6}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </Col>

          {/* Customer Service */}
          <Col md={3} sm={6}>
            <h5>Customer Service</h5>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/shipping">Shipping & Delivery</a></li>
              <li><a href="/returns">Returns & Refunds</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </Col>

          {/* Social Media Icons */}
          <Col md={3} sm={12}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Grihalakshmi Mart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
