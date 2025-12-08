export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__outer">
        <div className="footer__inner">
          <span>Developed by Fred Hobbs</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
