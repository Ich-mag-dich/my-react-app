import "./css/Test.css"
import { Link } from "react-router-dom";

function Test() {
  return (
    <div>
      <div className="box oneBox">
        <p>This is test page.</p>
        <h1>

          QWER1234

        </h1>
        <h3>
          react Route test

        </h3>
        <h3>
          test test
        </h3>
        <Link to="/test/1" className="HeaderBtn">test2</Link>
      </div>
    </div>
  );
}

export default Test;
