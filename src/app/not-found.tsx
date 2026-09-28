export default function NotFound() {
  return (
    <div className="section">
      <div className="wrap" style={{ textAlign: 'center', padding: '60px 24px' }}>
        <h1>Page not found</h1>
        <p style={{ margin: '16px auto 28px' }}>
          The page you are looking for does not exist or has moved.
        </p>
        <a className="btn" href="/">
          Return to the home page
        </a>
      </div>
    </div>
  );
}
