import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/router';
import classNames from 'classnames';
import { Fragment } from 'react';
import { useAuthActions, useUser } from '../utils/hooks';
import { ArtisLogo } from './Logo';

function MobileMenuButton({ menuOpen }: { menuOpen: boolean }) {
  return (
    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
      <span className="sr-only">Open main menu</span>
      {menuOpen ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  );
}

function useProfileDropdown() {
  const { handleLogout } = useAuthActions();
  const user = useUser();
  const navigate = useNavigate();
  return {
    user,
    userNavigation: [
      {
        name: 'Settings',
        onClick: () =>
          navigate({
            search: (old) => ({ ...old, modal: { type: 'settings' } }),
          }),
      },
      { name: 'Sign out', onClick: handleLogout },
    ],
  };
}

function ProfileDropdown() {
  const { userNavigation, user } = useProfileDropdown();
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  type="button"
                  tabIndex={0}
                  onClick={item?.onClick ?? undefined}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 w-full text-start',
                  )}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function TopBar({ open }: { open: boolean }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-10 justify-between">
        <div className="flex">
          <div className="-ml-2 mr-2 flex items-center md:hidden">
            <MobileMenuButton menuOpen={open} />
          </div>
          <div className="flex flex-shrink-0 items-center">
            <ArtisLogo className="block h-8 w-auto lg:hidden" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">something</div>
          <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const { user, userNavigation } = useProfileDropdown();
  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          <TopBar open={open} />
          <Disclosure.Panel className="md:hidden">
            <div id="mobile-nav" className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="button"
                    type="button"
                    onClick={item.onClick ?? undefined}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
