'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserTabs() {
  const path = usePathname();

  return (
    <div className="flex items-center justify-center gap-10 m-10">
      <Link
        href="/profile"
        className={`usertabs ${path === '/profile' ? 'active' : ''}`}
      >
        Profile
      </Link>
      <Link
        href="/categories"
        className={`usertabs ${path === '/categories' ? 'active' : ''}`}
      >
        Categories
      </Link>
      <Link
        href="/menuitems"
        className={`usertabs ${path === '/menuitems' ? 'active' : ''}`}
      >
        MenuItems
      </Link>
      <Link
        href="/users"
        className={`usertabs ${path === '/users' ? 'active' : ''}`}
      >
        Users
      </Link>
    </div>
  );
}

