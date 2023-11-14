import { Fragment, ReactNode } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from "js-cookie"

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

interface MenuButtonProps {
  open: boolean;
}

interface MenuItemsProps {
  active: boolean;
}

interface ProfileImageProps {
  src: string;
  alt: string;
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: false },  
  { name: 'Dashboard', href:'/dashboard', current: false },
  { name: 'Interviews', href: '/interviews', current: false },
  { name: 'Lists', href: '/list', current: false },

];

export default function Navbar2() {

  const token: string | undefined = Cookies.get("token") || undefined;

  return (
    <Disclosure as="nav" className="bg-gray-800 h-14">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <a href="/" className="flex ms-2 md:me-24">
                <img
                  src="https://huru.ai/wp-content/uploads/2023/05/HURU-LOGO.webp"
                  className="h-8 me-3"
                  alt="Logo"
                />
                <span className="text-white self-center hidden sm:flex text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
  AI Interviewer
</span>
              </a>
              
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item: NavigationItem) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                <div>
                  <p className='text-white'>Hello, Suriya</p>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6840.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1698883200&semt=ais"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  {token ? (
    <>
      <Menu.Item>
        {({ active }: MenuItemsProps) => (
          <a
            href="/profile"
            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
          >
            Your Profile
          </a>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }: MenuItemsProps) => (
          <a
            href="/register"  // Change href to the logout endpoint or path
            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
          >
            Sign out
          </a>
        )}
      </Menu.Item>
    </>
  ) : (
    <>
      <Menu.Item>
        {({ active }: MenuItemsProps) => (
          <a
            href="/login"  // Change href to the login endpoint or path
            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
          >
            Login
          </a>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }: MenuItemsProps) => (
          <a
            href="/register"  // Change href to the signup endpoint or path
            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
          >
            Sign up
          </a>
        )}
      </Menu.Item>
    </>
  )}
</Menu.Items>

                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item: NavigationItem) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
