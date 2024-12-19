"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Check, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
const songCards = [
  {
    id: 1,
    title: "Brille brille petite étoile",
    category: "French Nursery Rhymes",
    audioUrl: "/assets/audio/learn-with-songs/Brille brille petite étoile.mp3",
  },
  {
    id: 2,
    title: "Les fruits Chanson",
    category: "Educational Songs - Fruits",
    audioUrl: "/assets/audio/learn-with-songs/Fruits Song.mp3",
  },
  {
    id: 3,
    title: "How are you in French",
    category: "Conversational French Songs",
    audioUrl: "/assets/audio/learn-with-songs/How are you in French song.mp3",
  },
  {
    id: 4,
    title: "Cherchez moi coucou coucou",
    category: "Classic French Children's Songs",
    audioUrl: "/assets/audio/learn-with-songs/coucou coucou.mp3",
  },
  {
    id: 5,
    title: "La Chanson de l'Alphabet",
    category: "French Alphabet Songs",
    audioUrl: "/assets/audio/learn-with-songs/ABC Song.mp3",
    duration: "1:55",
  },
  {
    id: 6,
    title: "Chanson des Chiffres",
    category: "French Numbers Songs",
    audioUrl: "/assets/audio/learn-with-songs/Numbers Song.mp3",
    duration: "1:35",
  },
];
const LearnWithMusicPage = () => {
  // State management
  const [checkedSongs, setCheckedSongs] = useLocalStorage<Set<number>>(
    "learnWithSongsChecked",
    new Set()
  );
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  const [, setSongIsPlaying] = useState(false);
  // Audio play handler
  const handlePlayAudio = (id: number, audioUrl: string) => {
    // Stop any currently playing song
    Object.values(audioRefs.current).forEach((audio) => audio.pause());

    // Create audio element if it doesn't exist
    if (!audioRefs.current[id]) {
      const audio = new Audio(audioUrl);
      audioRefs.current[id] = audio;

      // Auto-check when song finishes
      audio.addEventListener("ended", () => {
        setPlayingSongId(null);
        handleCheck(id);
      });
    }

    const audio = audioRefs.current[id];

    if (playingSongId === id) {
      // If clicking the same song, stop it
      setSongIsPlaying(false);
      audio.pause();
      setPlayingSongId(null);
    } else {
      // Play the new song
      setSongIsPlaying(true);
      audio.play();
      setPlayingSongId(id);
    }
  };

  // Check/Uncheck song
  const handleCheck = (id: number) => {
    const newCheckedSongs = new Set(checkedSongs);
    if (newCheckedSongs.has(id)) {
      newCheckedSongs.delete(id);
    } else {
      newCheckedSongs.add(id);
    }
    setCheckedSongs(newCheckedSongs);
  };

  // Calculate progress
  const calculateProgress = (): number => {
    return (Array.from(checkedSongs).length / songCards.length) * 100;
  };
  useEffect(() => {
    // Capture the current value of audioRefs
    const currentAudioRefs = audioRefs.current;

    // Cleanup function
    return () => {
      Object.values(currentAudioRefs).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      setPlayingSongId(null);
      setSongIsPlaying(false);
    };
  }, []);
  return (
    <div className="bg-gradient-to-b sm:mt-44 mt-20 from-white via-orange-100 to-white min-h-screen">
      {/* Header Section */}
      <section className="px-4 py-10 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Learn French with Songs
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Master French through traditional and classic songs. Click play to
            listen and learn!
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {Array.from(new Set(songCards.map((card) => card.category))).map(
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

        {/* Song Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {songCards.map((card) => (
            <Card
              key={card.id}
              className={`group rounded-lg hover:shadow-lg transition-all duration-300 ${
                checkedSongs.has(card.id) ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <CardHeader className="p-6 pb-0">
                <div className="flex justify-between items-center ">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      {card.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full transition-colors ${
                        playingSongId === card.id
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-orange-100 hover:bg-orange-200"
                      }`}
                      onClick={() => handlePlayAudio(card.id, card.audioUrl)}
                    >
                      {playingSongId === card.id ? (
                        <Pause className="h-4 w-4 text-white" />
                      ) : (
                        <Play className="h-4 w-4 text-orange-600" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full transition-colors ${
                      checkedSongs.has(card.id)
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-orange-100 hover:bg-orange-200"
                    }`}
                    onClick={() => handleCheck(card.id)}
                  >
                    <Check
                      className={`h-4 w-4 ${
                        checkedSongs.has(card.id)
                          ? "text-white"
                          : "text-orange-600"
                      }`}
                    />
                  </Button>
                </div>
                <Badge
                  variant="secondary"
                  className="mt-4 bg-orange-50 text-orange-600"
                >
                  {card.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
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
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <p className="text-gray-600 mb-4">
              You&apos;ve learned {checkedSongs.size} out of {songCards.length}{" "}
              songs in this section!
            </p>
            <Button className="bg-orange-500 font-semibold hover:bg-orange-600">
              <Link href="/learn-with-videos">Continue Learning</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LearnWithMusicPage;
