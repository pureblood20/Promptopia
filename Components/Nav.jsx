"use client";

import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDroppDown] = useState();
  useEffect(() => {
    const getProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    getProvider();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          alt="Profile Pic"
          width="30"
          height="30"
        ></Image>
        <p className="logo_text"> Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button type="submit" className="outline_btn" onClick={signOut}>
              SignOut
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                    key={provider.name}
                  >
                    Sign In
                  </button>
                );
              })}
          </div>
        )}
      </div>
      {/* mobile navi */}
      <div className="sm:hidden flex relative">
        test
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => {
                setToggleDroppDown((toggle) => !toggle);
              }}
            ></Image>
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setToggleDroppDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setToggleDroppDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={signOut}
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                  key={provider.name}
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
