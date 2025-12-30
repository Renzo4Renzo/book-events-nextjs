"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
  const handleLogoClick = () => {
    posthog.capture("logo_clicked", {
      source: "navbar",
    });
  };

  const handleNavHomeClick = () => {
    posthog.capture("nav_home_clicked", {
      source: "navbar",
    });
  };

  const handleNavEventsClick = () => {
    posthog.capture("nav_events_clicked", {
      source: "navbar",
    });
  };

  const handleNavCreateEventClick = () => {
    posthog.capture("nav_create_event_clicked", {
      source: "navbar",
    });
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo" onClick={handleLogoClick}>
          <Image
            src="/icons/logo.png"
            alt="logo"
            width={24}
            height={24}
          ></Image>
          <p>CoolEvents</p>
        </Link>
        <ul>
          <Link href="/" onClick={handleNavHomeClick}>Home</Link>
          <Link href="/" onClick={handleNavEventsClick}>Events</Link>
          <Link href="/" onClick={handleNavCreateEventClick}>Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
