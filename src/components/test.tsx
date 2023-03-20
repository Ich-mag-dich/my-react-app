import "./css/Test.css";
import { Link } from "react-router-dom";

interface ITestProps {
  cityName: any;
  cookies: any;
}
function Test(props: ITestProps) {
  const { cityName, cookies } = props;
  return (
    <div>
      <div className="box oneBox">
        <p>This is test page.</p>
        <h1>QWER1234</h1>
        <h3>react Route test</h3>
        <h3>city name : {cityName}</h3>
        <h5>cookies : {cookies}</h5>
        <Link to="/test/1" className="HeaderBtn">
          test2
        </Link>
      </div>
    </div>
  );
}

export default Test;
