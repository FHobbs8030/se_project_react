import '../blocks/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__outer">
        <div className="footer__inner">
          <span className="footer__author">Developed by Fred Hobbs</span>
          <span className="footer__year">{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
