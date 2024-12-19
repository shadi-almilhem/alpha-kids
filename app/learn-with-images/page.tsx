"use client";
import React from "react";
import { Play, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lettersCards = Array.from({ length: 26 }, (_, index) => ({
  id: index + 1,
  letter: letters[index],
  image: `/assets/images/learn-with-images/letters-${(
    index + 1
  ).toString()}.webp`,
  audioUrl: `/assets/audio/learn-with-images/letters_${(
    index + 1
  ).toString()}.m4a`,
  category: "Alphabet",
}));

// Existing vocabulary cards
const vocabularyCards = [
  {
    id: 1,
    image: "/assets/images/learn-with-images/cat.webp",
    french: "Le chat",
    english: "The cat",
    category: "Animals",
    audioUrl: "/assets/audio/learn-with-images/cat.mp3",
  },
  {
    id: 2,
    image: "/assets/images/learn-with-images/apple.webp",
    french: "La pomme",
    english: "The apple",
    category: "Food",
    audioUrl: "/assets/audio/learn-with-images/apple.mp3",
  },
  {
    id: 3,
    image: "/assets/images/learn-with-images/house.webp",
    french: "La maison",
    english: "The house",
    category: "Places",
    audioUrl: "/assets/audio/learn-with-images/house.mp3",
  },
  {
    id: 4,
    image: "/assets/images/learn-with-images/bicycle.webp",
    french: "Le vélo",
    english: "The bicycle",
    category: "Transportation",
    audioUrl: "/assets/audio/learn-with-images/bicycle.mp3",
  },
  {
    id: 5,
    image: "/assets/images/learn-with-images/tree.webp",
    french: "L'arbre",
    english: "The tree",
    category: "Nature",
    audioUrl: "/assets/audio/learn-with-images/tree.mp3",
  },
  {
    id: 6,
    image: "/assets/images/learn-with-images/book.webp",
    french: "Le livre",
    english: "The book",
    category: "Objects",
    audioUrl: "/assets/audio/learn-with-images/book.mp3",
  },
];
const LearnWithImagesPage = () => {
  // Letters vocabulary

  const handlePlayAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio
      .play()
      .then(() => {
        console.log(`Playing audio: ${audioUrl}`);
      })
      .catch((error) => {
        console.error(`Error playing audio: ${error}`);
      });
  };

  // State for checked words and progress (for both letters and vocabulary)
  const [checkedWords, setCheckedWords] = useLocalStorage<Set<number>>(
    "learnWithImagesChecked",
    new Set()
  );

  const handleCheck = (id: number) => {
    setCheckedWords((prevChecked) => {
      const newCheckedWords = new Set(prevChecked);
      if (newCheckedWords.has(id)) {
        newCheckedWords.delete(id);
      } else {
        newCheckedWords.add(id);
      }
      return newCheckedWords;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateProgress = (cards: any[]): number => {
    return (Array.from(checkedWords).length / cards.length) * 100;
  };

  return (
    <div className="bg-gradient-to-b sm:mt-44 mt-20 from-white via-orange-100 to-white min-h-screen">
      {/* Header Section */}
      <section className="px-4 py-10 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Learn French with Images
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Master French vocabulary through beautiful images and interactive
            cards. Click the sound icon to hear native pronunciation!
          </p>
        </div>

        {/* Letters Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              French Alphabet
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn the French alphabet with visual and audio cues
            </p>
          </div>

          {/* Letters Filter Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Array.from(new Set(lettersCards.map((card) => card.category))).map(
              (category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-orange-100 text-orange-700 cursor-pointer hover:bg-orange-200"
                >
                  {category}
                </Badge>
              )
            )}
          </div>

          {/* Letters Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {lettersCards.map((card) => (
              <Card
                key={card.id}
                className={`group rounded-t-lg hover:shadow-lg transition-all duration-300 ${
                  checkedWords.has(card.id) ? "ring-2 ring-orange-500" : ""
                }`}
              >
                <CardHeader className="p-0">
                  <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                    <Image
                      width={640}
                      height={420}
                      src={card.image}
                      alt={card.letter}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {card.letter}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-orange-100 hover:bg-orange-200"
                        onClick={() => handlePlayAudio(card.audioUrl)}
                      >
                        <Play className="h-4 w-4 text-orange-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full transition-colors ${
                          checkedWords.has(card.id)
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-orange-100 hover:bg-orange-200"
                        }`}
                        onClick={() => handleCheck(card.id)}
                      >
                        <Check
                          className={`h-4 w-4 ${
                            checkedWords.has(card.id)
                              ? "text-white"
                              : "text-orange-600"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-50 text-orange-600"
                  >
                    {card.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Vocabulary Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              French Vocabulary
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expand your French vocabulary with everyday words
            </p>
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Array.from(
              new Set(vocabularyCards.map((card) => card.category))
            ).map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-orange-100 text-orange-700 cursor-pointer hover:bg-orange-200"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Vocabulary Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vocabularyCards.map((card) => (
              <Card
                key={card.id}
                className={`group rounded-t-lg hover:shadow-lg transition-all duration-300 ${
                  checkedWords.has(card.id) ? "ring-2 ring-orange-500" : ""
                }`}
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      width={640}
                      height={420}
                      src={card.image}
                      alt={card.french}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {card.french}
                      </CardTitle>
                      <p className="text-gray-600">{card.english}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-orange-100 hover:bg-orange-200"
                        onClick={() => handlePlayAudio(card.audioUrl)}
                      >
                        <Play className="h-4 w-4 text-orange-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full transition-colors ${
                          checkedWords.has(card.id)
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-orange-100 hover:bg-orange-200"
                        }`}
                        onClick={() => handleCheck(card.id)}
                      >
                        <Check
                          className={`h-4 w-4 ${
                            checkedWords.has(card.id)
                              ? "text-white"
                              : "text-orange-600"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-50 text-orange-600"
                  >
                    {card.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </section>

      {/* Progress Section */}
      <section className="px-4 py-8 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <Card className="bg-white pattern-secondary">
          <CardContent className="flex flex-col items-center text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Learning Progress
            </h2>
            <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${calculateProgress([
                    ...lettersCards,
                    ...vocabularyCards,
                  ])}%`,
                }}
              ></div>
            </div>
            <p className="text-gray-600 mb-4">
              You&apos;ve learned {checkedWords.size} out of{" "}
              {lettersCards.length + vocabularyCards.length} words in this
              section!
            </p>
            <Button className="bg-orange-500 font-semibold hover:bg-orange-600">
              <Link href="/learn-with-music">Continue Learning</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LearnWithImagesPage;
