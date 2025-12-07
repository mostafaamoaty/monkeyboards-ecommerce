import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiInstagram, SiFacebook, SiYoutube } from "react-icons/si";
import logo from "@assets/MONKEY_TEXT_LOGO.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img src={logo} alt="Monkey Boards" className="h-40 w-auto" />
            <p className="text-muted-foreground text-sm max-w-xs">
              Premium handmade guitar pedalboards crafted with passion. Your sound,
              handcrafted.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-youtube"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                data-testid="link-footer-products"
              >
                All Products
              </Link>
              <Link
                href="/custom"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                data-testid="link-footer-custom"
              >
                Build Custom
              </Link>
              <Link
                href="/checkout"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                data-testid="link-footer-checkout"
              >
                Checkout
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hello@monkeyboards.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Monkey Boards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
