import { Link } from "wouter";
import { ArrowRight, Hammer, Palette, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/products";
import heroImage from "@assets/generated_images/hero_pedalboard_lifestyle_shot.png";
import craftImage from "@assets/generated_images/craftsman_workshop_scene.png";
import woodGrain from "@assets/generated_images/wood_grain_detail_closeup.png";

const features = [
  {
    icon: Hammer,
    title: "Handcrafted Quality",
    description:
      "Each pedalboard is individually crafted by skilled artisans using premium hardwoods.",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description:
      "Choose your size, wood finish, and color. Build the perfect board for your rig.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Quick turnaround on all orders. Your custom board ships within 5-7 business days.",
  },
];

export default function Home() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl space-y-6">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Handcrafted in Egypt
            </Badge>
            <h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              data-testid="text-hero-title"
            >
              Your Sound.
              <br />
              <span className="text-primary">Handcrafted.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-lg">
              Premium wooden pedalboards built by musicians, for musicians. Every
              detail crafted with passion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="gap-2 font-semibold"
                  data-testid="button-shop-pedalboards"
                >
                  Shop Pedalboards
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/custom">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 font-semibold bg-white/10 border-white/30 text-white backdrop-blur-sm"
                  data-testid="button-build-custom"
                >
                  Build Custom
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Featured Pedalboards
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of handcrafted pedalboards, available in three
              sizes to fit any rig.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card
                  className="group overflow-hidden hover-elevate cursor-pointer h-full"
                  data-testid={`card-product-${product.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading font-semibold text-lg">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {product.tier}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg">
                        {formatPrice(product.basePrice)}
                      </p>
                      <span className="text-sm text-primary font-medium">
                        View Details
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" size="lg" className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={craftImage}
                  alt="Craftsman at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg overflow-hidden border-4 border-background shadow-lg hidden sm:block">
                <img
                  src={woodGrain}
                  alt="Wood grain detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <Badge>Our Craft</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold">
                Built With Passion, Finished With Precision
              </h2>
              <p className="text-muted-foreground text-lg">
                Every Monkey Board starts as raw, premium hardwood and is
                transformed through hours of careful craftsmanship. We sand each
                surface by hand, apply natural finishes that bring out the wood's
                character, and ensure every edge is perfectly smooth.
              </p>
              <ul className="space-y-3">
                {[
                  "Premium hardwoods sourced sustainably",
                  "Hand-sanded to a silky smooth finish",
                  "Natural oil finishes for lasting protection",
                  "Lifetime warranty on craftsmanship",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/custom">
                <Button size="lg" className="gap-2 mt-4">
                  Design Your Own
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Why Monkey Boards?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine traditional woodworking techniques with modern design to
              create pedalboards that look and perform exceptionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="text-center p-8">
                <CardContent className="space-y-4 p-0">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-primary-foreground text-primary-foreground"
              />
            ))}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Upgrade Your Rig?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of musicians who trust Monkey Boards for their pedal
            setup. Start building your dream pedalboard today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 font-semibold"
                data-testid="button-cta-shop"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/custom">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 font-semibold bg-transparent border-primary-foreground/30 text-primary-foreground"
                data-testid="button-cta-custom"
              >
                Build Custom
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
