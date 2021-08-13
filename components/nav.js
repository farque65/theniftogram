/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { XIcon, CameraIcon, FilterIcon, AnnotationIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Filter from './filter'
import Signin from './signin'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null)

  useEffect(() => {
    loadAccount()
  })

  async function loadAccount() {
    // For now, 'eth_accounts' will continue to always return an array
    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log('Please connect to MetaMask.');
        } else {
          setCurrentAccount(accounts[0]);
          // Do any other work!
        }
      }
      ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Please connect to MetaMask.');
        } else {
          console.error(error);
        }
      });
    }

  return (
    <>
			<div className="p-5 py-5 bg-yellow-500 text-center">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-black">
                <div className="flex-shrink-0 flex items-center bg-white rounded-full p-2">
                  <Link href="/">
                    <a>
                      <CameraIcon className="block lg:hidden h-8 w-8" alt="Niftygram" />
                    </a>
                  </Link>
                  <Link href="/">
                    <a>
                      <CameraIcon className="hidden lg:block h-8 w-8" alt="Niftygram" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Link key="navfaq" href="/faq">
                    <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2 text-gray-400 hover:text-green-500">   
                      <AnnotationIcon className="h-8 w-8 rounded-full" aria-hidden="true" />
                    </button>
                  </Link>

                  {/* Settings Button */}
                  <div className="ml-3 relative">
                        <div>
                          <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2 text-gray-400 hover:text-green-500">
                            <FilterIcon className="h-8 w-8 rounded-full" aria-hidden="true" onClick={() => setOpen(true)}/>
                          </button>
                        </div>
                        <Transition.Root show={open} as={Fragment}>
                          <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
                            <div className="absolute inset-0 overflow-hidden">
                              <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                              </Transition.Child>
                              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                                <Transition.Child
                                  as={Fragment}
                                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                                  enterFrom="translate-x-full"
                                  enterTo="translate-x-0"
                                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                                  leaveFrom="translate-x-0"
                                  leaveTo="translate-x-full"
                                >
                                  <div className="relative w-screen max-w-md">
                                    <Transition.Child
                                      as={Fragment}
                                      enter="ease-in-out duration-500"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="ease-in-out duration-500"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                        <button
                                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                          onClick={() => setOpen(false)}
                                        >
                                          <span className="sr-only">Close panel</span>
                                          <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                      </div>
                                    </Transition.Child>
                                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                      <Filter />
                                    </div>
                                  </div>
                                </Transition.Child>
                              </div>
                            </div>
                          </Dialog>
                        </Transition.Root>
                  </div>

                  <Signin address={currentAccount} />

                </div>
              </div>
            </div>
          </div>
    </>
  )
}
