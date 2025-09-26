import React from "react";
import { Container } from "react-bootstrap";
import "../styles/footer.css";


function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container className="text-center">
        <p>© 2025 My Shop | All rights reserved</p>
      </Container>
    </footer>
  );
}

export default Footer;
