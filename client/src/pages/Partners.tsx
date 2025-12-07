import { Link } from "wouter";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import gearhubLogo from "@assets/gearhub_logo.jpg";

export default function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1
            className="font-heading text-3xl sm:text-4xl font-bold mb-4"
            data-testid="text-partners-title"
          >
            Our Partners
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            Find all Monkey Boards products available at our trusted retail partner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img
                  src={gearhubLogo}
                  alt="Gearhub Music Store"
                  className="h-24 w-auto mb-4"
                />
                <h2 className="font-heading text-2xl font-bold mb-2">
                  Gearhub Music Store
                </h2>
                <p className="text-muted-foreground">
                  Visit Gearhub Music Store to see and purchase all Monkey Boards
                  products in person. Experience the quality and craftsmanship of our
                  handcrafted pedalboards firsthand.
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Cairo, Egypt
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Available Products:</strong> All
                  Monkey Boards products including Compact, Standard, and Pro pedalboards
                  are available at Gearhub Music Store.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="w-full h-full min-h-[450px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.9891958773037!2d31.30105277637159!3d30.065844174912993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fbbedd724cb%3A0xbe5040130b38078c!2sGearhub%20Music%20Store!5e0!3m2!1sen!2seg!4v1765140096928!5m2!1sen!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "450px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gearhub Music Store Location"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

