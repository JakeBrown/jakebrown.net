import { css } from "hono/css";

const footerStyle = css`
  background-color: var(--wheat);
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
`;

const containerStyle = css`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const flexContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const textCenterStyle = css`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const navStyle = css`
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const listStyle = css`
  display: flex;
  color: var(--night-sky);
  gap: 1.5rem;
  list-style-type: none;
`;

const linkStyle = css`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #d1d5db;
  }
`;

export default function Footer() {
  return (
    <footer className={footerStyle}>
      <div className={containerStyle}>
        <div className={flexContainerStyle}>
          {/* Left Section */}
          <div className={textCenterStyle}>
            <h2>Jake Brown 🚀</h2>
            <p className="footer-body">© 2025 All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
