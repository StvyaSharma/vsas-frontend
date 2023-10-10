import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user data from localStorage whenever the component mounts
    const userData = JSON.parse(localStorage.getItem('user')
    );
    setUser(userData);
    console.log(user)
  }, []);


  return (
    <nav className="">
      <div className="container mx-auto flex flex-wrap items-center justify-between" style={{ paddingInline: '10px', paddingBlock: '8.5px' }}>
        <Link href="/dashboard" className="flex">
          <span className="font self-center text-lg font-semibold whitespace-nowrap">Virtual Scroll Access System</span>
        </Link>
        <button data-collapse-toggle="mobile-menu" type="button" className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium md:bg-grey-100/10">
            <li>
              <a href="#" className="bg-grey-100 md:bg-grey-100/30 text-white block pl-3 pr-4 py-2 md:text-grey-100 md:p-0 rounded focus:outline-none" aria-current="page">
                {user ? user.username : 'Guest'}
              </a>
            </li>
            <li>
              <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="text-gray-700 hover:bg-gray-50 p-1.5 hover:rounded md:hover:bg-grey-100/20 pl-3 pr-4 py-2 md:hover:text-grey-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto">Dropdown <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>

              <div id="dropdownNavbar" className="hidden background text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44">
                <ul className="py-1" aria-labelledby="dropdownLargeButton">
                  {user ? <>
                    {user.userRole == 'admin' &&
                      <>
                        <li>
                          <Link href="/adduser" className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">Add User</Link>
                        </li>
                        <li>
                          <a href="/usercontrols" className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">User Controls</a>
                        </li>
                      </>
                    }
                    <li>
                      <a href="#" onClick={() => { console.log(user) }} className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">Update User Profile</a>
                    </li>
                    <li>
                      <a href="/userprofile" className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">My Profile</a>
                    </li>
                    <li>
                      <Link href="/myscrolls" className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">My Scrolls</Link>
                    </li>
                    <li>
                      <Link href="/addscroll" className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">Add Scroll</Link>
                    </li>
                  </>
                    :
                    <>
                      <li>
                        <Link href="/login" className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">Login</Link>
                      </li>
                      <li>
                        <Link href="/register" className="text-sm hover:bg-gray-100/10 dark:text-grey-100 block px-4 py-2 ">Register</Link>
                      </li>
                    </>
                  }
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
