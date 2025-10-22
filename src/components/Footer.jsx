import "../blocks/Footer.css"; 

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span className="footer__left">Developed by Fred Hobbs</span>
      <span className="footer__year">© {year}</span>
    </footer>
  );
}
