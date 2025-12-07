import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/cartStore";
import { getProductById, products } from "@/lib/products";
import { woodFinishes, colorOptions } from "@shared/schema";

export default function ProductDetails() {
  const [, params] = useRoute("/products/:id");
  const product = params?.id ? getProductById(params.id) : undefined;
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(woodFinishes[0].id);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].id);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">
            Product Not Found
          </h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const finishName =
      woodFinishes.find((f) => f.id === selectedFinish)?.name || selectedFinish;
    const colorName =
      colorOptions.find((c) => c.id === selectedColor)?.name || selectedColor;

    addItem({
      id: `${product.id}-${selectedFinish}-${selectedColor}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      size: product.size,
      tier: product.tier,
      woodFinish: finishName,
      color: colorName,
      quantity,
      price: product.basePrice,
      image: product.images[0],
      isCustom: false,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-main"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {product.tier}
                </Badge>
                <h1
                  className="font-heading text-3xl font-bold mb-2"
                  data-testid="text-product-name"
                >
                  {product.name}
                </h1>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <p
                className="font-heading text-3xl font-bold"
                data-testid="text-product-price"
              >
                {formatPrice(product.basePrice)}
              </p>

              <Separator />

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Wood Finish
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {woodFinishes.map((finish) => (
                      <button
                        key={finish.id}
                        onClick={() => setSelectedFinish(finish.id)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                          selectedFinish === finish.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border"
                        }`}
                        style={{ backgroundColor: finish.color }}
                        title={finish.name}
                        data-testid={`button-finish-${finish.id}`}
                      >
                        {selectedFinish === finish.id && (
                          <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {woodFinishes.find((f) => f.id === selectedFinish)?.name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Accent Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border"
                        }`}
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                        data-testid={`button-color-${color.id}`}
                      >
                        {selectedColor === color.id && (
                          <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {colorOptions.find((c) => c.id === selectedColor)?.name}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-none rounded-l-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-quantity-decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-none rounded-r-lg"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-quantity-increase"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  data-testid="button-add-to-cart"
                >
                  Add to Cart
                </Button>
              </div>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Separator className="mb-12" />
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold">About This Product</h2>
            <p className="text-muted-foreground max-w-3xl">
              {product.longDescription}
            </p>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-12" />
            <h2 className="font-heading text-2xl font-bold mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <Card
                    className="group overflow-hidden hover-elevate cursor-pointer"
                    data-testid={`card-related-${p.id}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-32 h-32 flex-shrink-0 overflow-hidden bg-muted">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4 flex flex-col justify-center">
                        <h3 className="font-heading font-semibold">{p.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {p.description}
                        </p>
                        <p className="font-semibold">{formatPrice(p.basePrice)}</p>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
