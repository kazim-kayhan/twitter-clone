import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = Record<string, never>;

const SideNav = (props: Props) => {
  const session = useSession();
  const user = session?.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="item-start flex flex-col gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user != null && (
          <li>
            <Link href={`/profile/${user?.id}`}>Profile</Link>
          </li>
        )}

        {user != null ? (
          <li>
            <li>
              <button onClick={() => void signOut()}>Log Out</button>
            </li>
          </li>
        ) : (
          <li>
            <button onClick={() => void signIn()}>Log In</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
