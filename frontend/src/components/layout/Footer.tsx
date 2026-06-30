export function Footer() {
  return (
    <footer className="border-top py-4 mt-auto">
      <div className="container small text-muted d-flex justify-content-between">
        <span>© {new Date().getFullYear()} Stagepick by Spirou333</span>
        <span>Application Portal</span>
      </div>
    </footer>
  );
}