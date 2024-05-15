import { useNavigate } from 'react-router-dom';
const Navbar = () => {
const naviagate = useNavigate()
    const handleLogout = () => {
naviagate('/')
    }
    return(
<div>



<div className="navbar bg-base-100">
  <div className="flex-1">
    <a href='/#' className="btn btn-ghost text-xl">TDHC</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle">
        <div className="indicator">
        <svg width="24" height="24" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20ZM14 14V9C14 5.93 12.37 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.64 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14ZM12 15H4V9C4 6.52 5.51 4.5 8 4.5C10.49 4.5 12 6.52 12 9V15Z" fill="#0C4767"/>
        </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex="0" className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">Notifications</span>
       
         
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="../images/navbarImage.jpg" />
        </div>
      </label>
      <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a href='/#' className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a href='/#'>Settings</a></li>
        <li onClick={handleLogout}><a href='/#'> Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</div>
    )
}

export default Navbar