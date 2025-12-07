import { useState } from "react";
import { Check, Minus, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/cartStore";
import {
  woodFinishes,
  tierOptions,
  calculateCustomPrice,
} from "@shared/schema";
import woodGrain from "@assets/generated_images/wood_grain_detail_closeup.png";

export default function CustomBuilder() {
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  const [width, setWidth] = useState(45);
  const [height, setHeight] = useState(20);
  const [tier, setTier] = useState<"1-tier" | "2-tier">("1-tier");
  const [selectedFinish, setSelectedFinish] = useState<(typeof woodFinishes)[number]["id"]>(woodFinishes[0].id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const customPrice = calculateCustomPrice({
    width,
    height,
    tier,
    woodFinish: selectedFinish,
  });

  const handleAddToCart = () => {
    const finishName =
      woodFinishes.find((f) => f.id === selectedFinish)?.name || selectedFinish;

    addItem({
      id: `custom-${width}x${height}-${tier}-${selectedFinish}-${Date.now()}`,
      productId: "custom",
      productName: "Custom Pedalboard",
      size: `${width}cm x ${height}cm`,
      tier,
      woodFinish: finishName,
      quantity: 1,
      price: customPrice,
      image: woodGrain,
      isCustom: true,
      customDimensions: { width, height },
    });

    toast({
      title: "Custom board added",
      description: "Your custom pedalboard has been added to the cart.",
    });
  };

  const adjustWidth = (delta: number) => {
    setWidth((prev) => Math.min(100, Math.max(20, prev + delta)));
  };

  const adjustHeight = (delta: number) => {
    setHeight((prev) => Math.min(60, Math.max(10, prev + delta)));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Badge className="mb-3">Custom Builder</Badge>
          <h1
            className="font-heading text-3xl sm:text-4xl font-bold mb-2"
            data-testid="text-custom-title"
          >
            Build Your Dream Pedalboard
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Design a pedalboard that fits your exact needs. Choose your
            dimensions, tier configuration, and wood finish.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    1
                  </span>
                  Dimensions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="width" className="text-sm font-medium">
                      Width (cm)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustWidth(-5)}
                        disabled={width <= 20}
                        data-testid="button-width-decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) =>
                          setWidth(
                            Math.min(100, Math.max(20, Number(e.target.value)))
                          )
                        }
                        className="text-center text-lg font-semibold"
                        min={20}
                        max={100}
                        data-testid="input-width"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustWidth(5)}
                        disabled={width >= 100}
                        data-testid="button-width-increase"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Range: 20cm - 100cm
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="height" className="text-sm font-medium">
                      Depth (cm)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustHeight(-5)}
                        disabled={height <= 10}
                        data-testid="button-height-decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) =>
                          setHeight(
                            Math.min(60, Math.max(10, Number(e.target.value)))
                          )
                        }
                        className="text-center text-lg font-semibold"
                        min={10}
                        max={60}
                        data-testid="input-height"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => adjustHeight(5)}
                        disabled={height >= 60}
                        data-testid="button-height-increase"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Range: 10cm - 60cm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    2
                  </span>
                  Tier Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tierOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setTier(option)}
                      className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                        tier === option
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80"
                      }`}
                      data-testid={`button-tier-${option}`}
                    >
                      {tier === option && (
                        <Check className="absolute top-3 right-3 h-5 w-5 text-primary" />
                      )}
                      <h4 className="font-semibold mb-1">
                        {option === "1-tier" ? "Single Tier" : "Two Tier"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {option === "1-tier"
                          ? "Flat design, easy access to all pedals"
                          : "Elevated rear row for better visibility (+40%)"}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    3
                  </span>
                  Wood Finish
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {woodFinishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all min-w-[80px] ${
                        selectedFinish === finish.id
                          ? "border-primary"
                          : "border-border"
                      }`}
                      data-testid={`button-finish-${finish.id}`}
                    >
                      <div
                        className={`relative w-12 h-12 rounded-full border-2 ${
                          selectedFinish === finish.id
                            ? "ring-2 ring-primary/20"
                            : ""
                        }`}
                        style={{ backgroundColor: finish.color }}
                      >
                        {selectedFinish === finish.id && (
                          <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-md" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-center">
                        {finish.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-muted relative">
                  <img
                    src={woodGrain}
                    alt="Custom pedalboard preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="border-4 border-dashed border-primary/50 rounded-lg flex items-center justify-center transition-all"
                      style={{
                        width: `${Math.min(80, (width / 100) * 80)}%`,
                        height: `${Math.min(80, (height / 60) * 80)}%`,
                        backgroundColor:
                          woodFinishes.find((f) => f.id === selectedFinish)
                            ?.color + "99",
                      }}
                    >
                      <div className="text-center text-white drop-shadow-lg">
                        <p className="font-heading font-bold text-lg">
                          {width} x {height} cm
                        </p>
                        <p className="text-sm">{tier}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-heading font-semibold text-lg">
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">
                        {width}cm x {height}cm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Configuration</span>
                      <span className="font-medium capitalize">
                        {tier === "1-tier" ? "Single Tier" : "Two Tier"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wood Finish</span>
                      <span className="font-medium">
                        {
                          woodFinishes.find((f) => f.id === selectedFinish)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-heading font-semibold">Total</span>
                    <span
                      className="font-heading text-2xl font-bold"
                      data-testid="text-custom-price"
                    >
                      {formatPrice(customPrice)}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                    data-testid="button-add-custom-to-cart"
                  >
                    Add to Cart
                  </Button>

                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="h-4 w-4 flex-shrink-0" />
                    <p>
                      Custom pedalboards are made to order and ship within 7-10
                      business days. All custom orders are final.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
