import { useState } from "react";
import { Link } from "wouter";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { products } from "@/lib/products";

const sizeFilters = [
  { id: "compact", label: "Compact (4-6 pedals)" },
  { id: "standard", label: "Standard (10-12 pedals)" },
  { id: "pro", label: "Pro (up to 16 pedals)" },
];

const tierFilters = [
  { id: "1-tier", label: "Single Tier" },
  { id: "2-tier", label: "Two Tier" },
];

export default function Products() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleTier = (tier: string) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedTiers([]);
  };

  const filteredProducts = products.filter((product) => {
    const sizeMatch =
      selectedSizes.length === 0 || selectedSizes.includes(product.size);
    const tierMatch =
      selectedTiers.length === 0 || selectedTiers.includes(product.tier);
    return sizeMatch && tierMatch;
  });

  const hasActiveFilters = selectedSizes.length > 0 || selectedTiers.length > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Size</h4>
        <div className="space-y-2">
          {sizeFilters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-2">
              <Checkbox
                id={`size-${filter.id}`}
                checked={selectedSizes.includes(filter.id)}
                onCheckedChange={() => toggleSize(filter.id)}
                data-testid={`checkbox-size-${filter.id}`}
              />
              <Label
                htmlFor={`size-${filter.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {filter.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Tier</h4>
        <div className="space-y-2">
          {tierFilters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-2">
              <Checkbox
                id={`tier-${filter.id}`}
                checked={selectedTiers.includes(filter.id)}
                onCheckedChange={() => toggleTier(filter.id)}
                data-testid={`checkbox-tier-${filter.id}`}
              />
              <Label
                htmlFor={`tier-${filter.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {filter.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full"
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1
            className="font-heading text-3xl sm:text-4xl font-bold mb-2"
            data-testid="text-products-title"
          >
            All Pedalboards
          </h1>
          <p className="text-muted-foreground">
            Handcrafted with premium hardwoods. Choose your size and customize your
            finish.
          </p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold">Filters</h3>
                {hasActiveFilters && (
                  <Badge variant="secondary">
                    {selectedSizes.length + selectedTiers.length}
                  </Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1">
                        {selectedSizes.length + selectedTiers.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  No products match your filters.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card
                      className="group overflow-hidden hover-elevate cursor-pointer h-full"
                      data-testid={`card-product-${product.id}`}
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge
                          variant="secondary"
                          className="absolute top-3 right-3"
                        >
                          {product.tier}
                        </Badge>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <div>
                          <h3 className="font-heading font-semibold text-lg">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
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
            )}

            <div className="mt-12 p-8 bg-card rounded-xl border border-card-border text-center">
              <h3 className="font-heading text-xl font-semibold mb-2">
                Need Something Special?
              </h3>
              <p className="text-muted-foreground mb-4">
                Build a custom pedalboard with your exact specifications.
              </p>
              <Link href="/custom">
                <Button data-testid="button-build-custom">Build Custom</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
