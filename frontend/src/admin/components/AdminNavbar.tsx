import { Link } from "react-router";
import { images } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-primary/10">
      <Link to="/">
        <img src={images.logo} alt="" className="w-36 h-auto" />
      </Link>
    </div>
  );
};

export default AdminNavbar;
