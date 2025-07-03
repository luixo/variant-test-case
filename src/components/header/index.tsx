import React from "react";
import Image from "next/image";
import { HeaderApplications } from "@/components/header/applications";
import Link from "next/link";

export const Header = () => (
  <div className="flex gap-6 justify-between items-center">
    <Link className="flex gap-3 items-center" href="/">
      <Image
        src="/logo.svg"
        alt="Alt+Shift logo"
        width={44}
        height={44}
        priority
      />
      <span className="text-3xl font-display">Alt+Shift</span>
    </Link>
    <div className="flex gap-6">
      <HeaderApplications />
      <Link
        href="/"
        className="border bg-transparent size-10 flex items-center justify-center rounded-md"
      >
        <Image src="/home.svg" alt="Homepage" width={20} height={20} />
      </Link>
    </div>
  </div>
);
