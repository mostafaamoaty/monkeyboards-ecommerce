import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SiInstagram, SiFacebook, SiSpotify } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import andrewMaherImage from "@assets/andrew_maher.jpg";
import hanyAdelImage from "@assets/hany_adel.jpg";
import mahmoudSiamImage from "@assets/mahmoud_siam.jpg";

interface ArtistSocial {
  facebook?: string;
  instagram?: string;
  spotify?: string;
}

interface Artist {
  id: string;
  name: string;
  image: string;
  social: ArtistSocial;
}

const artists: Artist[] = [
  {
    id: "andrew-maher",
    name: "Andrew Maher",
    image: andrewMaherImage,
    social: {
      facebook: "https://www.facebook.com/andrew.maher.562",
      instagram: "https://www.instagram.com/andrewmaherofficial",
      spotify: "https://open.spotify.com/artist/5suoAYTBUbORVJoV17ZTn6?si=DwjHk5M0ShOOUw-JKbpKzg",
    },
  },
  {
    id: "handy-adel",
    name: "Handy Adel",
    image: hanyAdelImage,
    social: {
      facebook: "https://www.facebook.com/HanyAdelOfficial/",
      instagram: "https://www.instagram.com/hanyadelofficial/",
      spotify: "https://open.spotify.com/artist/4Te3SJVA9dluqVRfgGzrzQ?si=LWlxAJeuR_Kfqwxa6BHYtQ",
    },
  },
  {
    id: "mahmoud-siam",
    name: "Mahmoud Siam",
    image: mahmoudSiamImage,
    social: {
      facebook: "https://www.facebook.com/MahmoudSiamME",
      instagram: "https://www.instagram.com/ma7moud.siam/",
      spotify: "https://open.spotify.com/artist/5qTGPUX2P4ShWiUyIoWCo9?si=RiMsb2FlRKOY_HnhzMKLJw",
    },
  },
];

export default function Artists() {
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

        <div className="mb-12">
          <h1
            className="font-heading text-3xl sm:text-4xl font-bold mb-4"
            data-testid="text-artists-title"
          >
            Our Artists
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            Discover the talented musicians who trust Monkey Boards to power their
            performances. These featured artists rely on our handcrafted pedalboards to
            deliver exceptional sound on stage and in the studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Card
              key={artist.id}
              className="group overflow-hidden hover-elevate"
              data-testid={`card-artist-${artist.id}`}
            >
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="font-heading text-xl font-bold mb-4">{artist.name}</h2>
                <Separator className="my-4" />
                <div className="flex items-center gap-4">
                  {artist.social.facebook && (
                    <a
                      href={artist.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${artist.name} on Facebook`}
                    >
                      <SiFacebook className="h-5 w-5" />
                    </a>
                  )}
                  {artist.social.instagram && (
                    <a
                      href={artist.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${artist.name} on Instagram`}
                    >
                      <SiInstagram className="h-5 w-5" />
                    </a>
                  )}
                  {artist.social.spotify && (
                    <a
                      href={artist.social.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${artist.name} on Spotify`}
                    >
                      <SiSpotify className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

