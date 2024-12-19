import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Video, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LearningSection = () => {
  const learningMethods = [
    {
      title: "Learn with Images",
      description:
        "Colorful illustrations and flashcards make learning French words a breeze!",
      icon: <ImageIcon className="w-10 h-10 text-orange-500" />,
      href: "/learn-with-images",
      features: ["Visual memory aids", "Vocabulary", "Alphabet"],
      image: "/assets/images/learn-with-images.png",
    },
    {
      title: "Learn with Music",
      description:
        "Catchy French songs that make vocabulary and grammar stick naturally.",
      icon: <Music className="w-10 h-10 text-orange-500" />,
      href: "/learn-with-music",
      features: ["Fun songs", "Rhythm learning"],
      image: "/assets/images/learn-with-songs.png",
    },
    {
      title: "Learn with Videos",
      description:
        "Watch fun animated videos teaching French vocabulary, phrases, and pronunciation.",
      icon: <Video className="w-10 h-10 text-orange-500" />,
      href: "/learn-with-videos",
      features: ["Active subtitles", "Native pronunciation"],
      image: "/assets/images/learn-with-videos.png",
    },
  ];

  return (
    <div
      id="learning-section"
      className="bg-gradient-to-b from-white via-orange-100 to-white "
    >
      {/* Learning Methods Section */}
      <section className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Choose Your Learning Adventure
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every child learns differently! Pick the method that works best for
            your little one.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {learningMethods.map((method, idx) => (
            <Card
              key={idx}
              className="group bg-gradient-to-b from-white to-orange-50 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="mb-4">{method.icon}</div>
                <CardTitle className="text-xl font-bold">
                  {method.title}
                </CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={method.image}
                    alt={method.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {method.features.map((feature, fidx) => (
                    <Badge
                      key={fidx}
                      variant="secondary"
                      className="bg-orange-100 cursor-default text-orange-700"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link prefetch={true} href={method.href} className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Start Learning
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 pb-16 pt-0 mx-auto max-w-screen-xl sm:px-6 lg:px-8 ">
        <Card className=" text-white pattern">
          <CardContent className="flex flex-col items-center text-center py-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning French?
            </h2>
            <p className="mb-8 max-w-2xl">
              Join thousands of happy children who are already learning French
              in a fun and engaging way!
            </p>
            <Link href="/learn-with-images" prefetch={true}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white font-semibold text-orange-600 hover:bg-gray-100"
              >
                Start your Learning Journey
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LearningSection;
