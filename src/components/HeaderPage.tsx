import { Link } from "react-router-dom";
import "./css/HeaderPage.css";
function HeaderPage() {
  return (
    <div className="HeaderDiv">
      <Link to="/" className="HeaderBtn">
        Home
      </Link>
      <Link to="/test" className="HeaderBtn">
        Test
      </Link>
    </div>
  );
}

export default HeaderPage;
