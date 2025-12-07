import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cartStore";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import logo from "@assets/MONKEY_LOGO.png";
import logoText from "@assets/MONKEY_TEXT.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/custom", label: "Build Custom" },
  { href: "#", label: "Monkey Planner", badge: "Coming Soon", disabled: true },
];

export function Header() {
  const [location] = useLocation();
  const { getTotalItems, openCart } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Monkey Boards"
              className="h-14 w-auto"
              data-testid="img-logo"
            />
            <img src={logoText} alt="Monkey Boards" className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.disabled ? "#" : link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="font-medium relative"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  disabled={link.disabled}
                >
                  {link.label}
                  {link.badge && (
                    <Badge
                      variant="outline"
                      className="ml-2 text-xs border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="relative overflow-visible"
              onClick={openCart}
              data-testid="button-cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="!absolute top-0 right-0 h-4 w-4 min-w-4 flex items-center justify-center p-0 px-0 text-[10px] !rounded-full translate-x-1/2 -translate-y-1/2"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <nav className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant={location === link.href ? "secondary" : "ghost"}
                        className="w-full justify-start font-medium"
                        data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                      >
                        {link.label}
                        {link.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-2 text-xs"
                          >
                            {link.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
