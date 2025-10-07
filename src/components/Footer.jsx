import "../blocks/Footer.css"; 

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__left">Developed by Fred Hobbs</span>
        <span className="footer__right">© {year}</span>
      </div>
    </footer>
  );
}
