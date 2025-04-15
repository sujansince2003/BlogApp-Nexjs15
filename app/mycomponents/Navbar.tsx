"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky  top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 overflow-visible">
        <nav className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">
                <span className="text-primary">S.Blogs</span>
                <span className="text-foreground">.</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none ring-0 focus:ring-0">
                  <div className="flex items-center gap-2 rounded-full border p-1 px-2 hover:bg-accent">
                    {user.picture ? (
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={user.picture || "/placeholder.svg"}
                          alt={user.given_name || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {user.given_name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={4}
                  className="w-48 overflow-hidden"
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.given_name && (
                        <p className="font-medium">{`${user.given_name} ${
                          user.family_name || ""
                        }`}</p>
                      )}
                      {user.email && (
                        <p className="w-full truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutLink className="w-full cursor-pointer">
                      Logout
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <LoginLink
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Login
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({ variant: "default", size: "sm" })}
                >
                  Sign Up
                </RegisterLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 pb-32 shadow-md animate-in slide-in-from-top-5 md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              {user ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    {user.picture ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={user.picture || "/placeholder.svg"}
                          alt={user.given_name || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{`${user.given_name || ""} ${
                        user.family_name || ""
                      }`}</p>
                      {user.email && (
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Profile
                  </Link>
                  <LogoutLink
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    Logout
                  </LogoutLink>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <LoginLink className={buttonVariants({ variant: "outline" })}>
                    Login
                  </LoginLink>
                  <RegisterLink
                    className={buttonVariants({ variant: "default" })}
                  >
                    Sign Up
                  </RegisterLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
