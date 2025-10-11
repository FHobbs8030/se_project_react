import "../blocks/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__outer">
        <div className="footer__inner">
          <span>Developed by Fred Hobbs</span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
