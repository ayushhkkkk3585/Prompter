"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleDesktopDropdown, setToggleDesktopDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center w-full mb-5 p-5">
        <Link href="/" className="flex flex-center gap-2">
          <Image
            src="/pencil.jpg"
            alt="impromptu logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="text font-bold text-lg hidden md:block md:text-xl">
            Impromptu
          </p>
        </Link>

        {/* desktop navigation */}
        <div className="sm:flex hidden text">
          {session?.user ? (
            <div className="flex items-center gap-3 md:gap-5">
              <Link
                href="/create-prompt"
                className="bg-black py-2 px-3 rounded-full hover:bg-white hover:text-black hover:border-black border-[1px] text-white"
              >
                Create Post
              </Link>
              <button
                type="button"
                className="text-black py-2 px-3 rounded-full hover:bg-black hover:text-white border-black border-[1px]"
                onClick={signOut}
              >
                Sign Out
              </button>
              <div className="relative">
                <Image
                  src={session?.user.image}
                  alt="profile"
                  width={30}
                  height={30}
                  className="object-contain cursor-pointer rounded-full"
                  onClick={() => setToggleDesktopDropdown((prev) => !prev)}
                />
                {toggleDesktopDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-56 p-4 rounded-xl bg-white shadow-lg border border-gray-200 z-10">
                    <Link
                      href="/profile"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setToggleDesktopDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/collections"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setToggleDesktopDropdown(false)}
                    >
                      My Collections
                    </Link>
                    {/* <Link
                      href="/create-prompt"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setToggleDesktopDropdown(false)}
                    >
                      Create Post
                    </Link> */}
                    {/* <button
                      type="button"
                      onClick={() => {
                        setToggleDesktopDropdown(false);
                        signOut();
                      }}
                      className="mt-3 w-full px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-black rounded-md transition-all"
                    >
                      Sign Out
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    className="text-black py-2 px-3 rounded-full hover:bg-black hover:text-white border-black border-[1px]"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>

        {/* mobile navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex items-center gap-5">
              <Link
                href="/create-prompt"
                className="text-black text text-sm py-1 px-3 rounded-full hover:bg-black hover:text-white border-black border-[1px]"
                onClick={() => setToggleDropdown(false)}
              >
                Create Post
              </Link>
              <Image
                src={session?.user.image}
                alt="impromptu logo"
                width={30}
                height={30}
                className="object-contain cursor-pointer rounded-full"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />

              {toggleDropdown && (
                <div className="absolute right-0 top-full mt-3 w-56 p-4 rounded-xl bg-white shadow-lg border border-gray-200 z-10">
                  <Link
                    href="/profile"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/collections"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Collections
                  </Link>
                  {/* <Link
                    href="/create-prompt"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Post
                  </Link> */}
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-3 w-full px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-black rounded-md transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    className="text-black py-2 px-3 rounded-full hover:bg-black hover:text-white border-black border-[1px]"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
