import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1>FileUpload</h1>

      <div style={{display: "flex", flexDirection:"column"}}>
        <Link to="/">Single</Link>
        <Link to="/multiple">Multiple</Link>
      </div>
    </nav>
  )
}