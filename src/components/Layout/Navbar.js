import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const naviagate = useNavigate();
  const handleLogout = () => {
    naviagate("/");
  };
  localStorage.clear();

  sessionStorage.clear();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <h3 className="btn btn-ghost text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 transition duration-300">
            TDHC MOBILE NO.1 ASSEMBLY
          </h3>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="../images/navbarImage.jpg"
                />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={handleLogout}>
                <a href="/#"> Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
