import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CreditCard, Banknote, Loader2, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/cartStore";
import { orderSchema, type OrderFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      notes: "",
      paymentMethod: "cod",
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = async (data: OrderFormData) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        ...data,
        items,
        totalAmount: getTotalPrice(),
      };

      const response = await apiRequest("POST", "/api/orders", orderData);
      const result = await response.json();

      setOrderId(result.orderId);
      setOrderPlaced(true);
      clearCart();

      toast({
        title: "Order placed successfully!",
        description: `Your order #${result.orderId} has been confirmed.`,
      });
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-6 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1
                className="font-heading text-2xl font-bold mb-2"
                data-testid="text-order-success"
              >
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Thank you for your order. We'll contact you shortly to confirm
                delivery details.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-semibold" data-testid="text-order-id">
                {orderId}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/products">
                <Button className="w-full" data-testid="button-continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-6 space-y-6">
            <div>
              <h1 className="font-heading text-2xl font-bold mb-2">
                Your Cart is Empty
              </h1>
              <p className="text-muted-foreground">
                Add some products to your cart before checking out.
              </p>
            </div>
            <Link href="/products">
              <Button className="w-full" data-testid="button-browse-products">
                Browse Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>

        <h1
          className="font-heading text-3xl font-bold mb-8"
          data-testid="text-checkout-title"
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+20 123 456 7890"
                                {...field}
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your full street address"
                              className="resize-none"
                              {...field}
                              data-testid="input-address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Cairo"
                              {...field}
                              data-testid="input-city"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any special instructions for your order..."
                              className="resize-none"
                              {...field}
                              data-testid="input-notes"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div
                                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                  field.value === "cod"
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                                }`}
                                onClick={() => field.onChange("cod")}
                              >
                                <RadioGroupItem
                                  value="cod"
                                  id="cod"
                                  data-testid="radio-cod"
                                />
                                <Label
                                  htmlFor="cod"
                                  className="flex items-center gap-3 cursor-pointer flex-1"
                                >
                                  <Banknote className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="font-medium">
                                      Cash on Delivery (COD)
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Pay when you receive your order
                                    </p>
                                  </div>
                                </Label>
                              </div>

                              <div
                                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                  field.value === "instapay"
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                                }`}
                                onClick={() => field.onChange("instapay")}
                              >
                                <RadioGroupItem
                                  value="instapay"
                                  id="instapay"
                                  data-testid="radio-instapay"
                                />
                                <Label
                                  htmlFor="instapay"
                                  className="flex items-center gap-3 cursor-pointer flex-1"
                                >
                                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="font-medium">Instapay</p>
                                    <p className="text-sm text-muted-foreground">
                                      Instant bank transfer
                                    </p>
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-place-order"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - ${formatPrice(getTotalPrice())}`
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3"
                        data-testid={`checkout-item-${item.id}`}
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {item.productName}
                            {item.isCustom && (
                              <span className="text-primary ml-1">(Custom)</span>
                            )}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.woodFinish} / {item.color}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-primary">Free</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-heading font-semibold">Total</span>
                    <span
                      className="font-heading text-xl font-bold"
                      data-testid="text-checkout-total"
                    >
                      {formatPrice(getTotalPrice())}
                    </span>
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
