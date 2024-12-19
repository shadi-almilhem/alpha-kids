"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Check, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

const videoCards = [
  {
    id: 1,
    title: "Learn Alphabet",
    category: "Alphabet",
    videoUrl: "/assets/videos/learn-with-videos/alphabet.mp4",
  },
  {
    id: 2,
    title: "Learn Vegetables",
    category: "Vegetables",
    videoUrl: "/assets/videos/learn-with-videos/vegetables.mp4",
  },
  {
    id: 3,
    title: "Learn Fruits",
    category: "Fruits",
    videoUrl: "/assets/videos/learn-with-videos/fruits.mp4",
  },
  {
    id: 4,
    title: "Learn Animals",
    category: "Animals",
    videoUrl: "/assets/videos/learn-with-videos/animals.mp4",
  },
  {
    id: 5,
    title: "Learn Shapes",
    category: "Shapes",
    videoUrl: "/assets/videos/learn-with-videos/shapes.mp4",
  },
  {
    id: 6,
    title: "Learn Numbers",
    category: "Numbers",
    videoUrl: "/assets/videos/learn-with-videos/numbers.mp4",
  },
];
const LearnWithVideosPage = () => {
  const [checkedVideos, setCheckedVideos] = useLocalStorage<Set<number>>(
    "learnWithVideosChecked",
    new Set()
  );

  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Handle video play/pause from card button
  const handlePlayVideo = (id: number) => {
    // First pause all videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
      }
    });

    const currentVideo = videoRefs.current[id];
    if (currentVideo) {
      if (playingVideoId === id) {
        currentVideo.pause();
        setPlayingVideoId(null);
      } else {
        currentVideo.play();
        setPlayingVideoId(id);
      }
    }
  };

  // Synchronize video play/pause button with the native video controls
  useEffect(() => {
    const currentVideoRefs = videoRefs.current;

    Object.entries(currentVideoRefs).forEach(([id, video]) => {
      if (video) {
        const handlePlay = () => {
          // Pause all other videos when one starts playing
          Object.entries(currentVideoRefs).forEach(([otherId, otherVideo]) => {
            if (otherVideo && otherId !== id) {
              otherVideo.pause();
            }
          });
          setPlayingVideoId(Number(id));
        };
        const handlePause = () => setPlayingVideoId(null);

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
      }
    });

    return () => {
      Object.entries(currentVideoRefs).forEach(([id, video]) => {
        if (video) {
          const handlePlay = () => {
            // Pause all other videos when one starts playing
            Object.entries(currentVideoRefs).forEach(
              ([otherId, otherVideo]) => {
                if (otherVideo && otherId !== id) {
                  otherVideo.pause();
                }
              }
            );
            setPlayingVideoId(Number(id));
          };
          const handlePause = () => setPlayingVideoId(null);

          video.removeEventListener("play", handlePlay);
          video.removeEventListener("pause", handlePause);
        }
      });
    };
  }, []);

  // Mark video as checked
  const handleCheck = (id: number) => {
    const newCheckedVideos = new Set(checkedVideos);
    if (newCheckedVideos.has(id)) {
      newCheckedVideos.delete(id);
    } else {
      newCheckedVideos.add(id);
    }
    setCheckedVideos(newCheckedVideos);
  };

  // Calculate progress
  const calculateProgress = (): number => {
    return (Array.from(checkedVideos).length / videoCards.length) * 100;
  };

  return (
    <div className="bg-gradient-to-b sm:mt-44 mt-20 from-white via-orange-100 to-white min-h-screen">
      {/* Header Section */}
      <section className="px-4 py-10 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Learn French with Videos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch videos and master French vocabulary, grammar, and
            pronunciation!
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {Array.from(new Set(videoCards.map((card) => card.category))).map(
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
        {/* Video Cards Grid */}
        <div className="grid gap-6 grid-cols-1 ">
          {videoCards.map((card) => (
            <Card
              key={card.id}
              className={`group rounded-lg hover:shadow-lg transition-all duration-300 ${
                checkedVideos.has(card.id) ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <CardHeader className="p-6 pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {card.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="relative">
                  <video
                    ref={(el: HTMLVideoElement | null) => {
                      videoRefs.current[card.id] = el;
                    }}
                    className="w-full rounded-lg"
                    controls
                    onEnded={() => handleCheck(card.id)}
                  >
                    <source src={card.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePlayVideo(card.id)}
                    className="rounded-full bg-orange-100 hover:bg-orange-200"
                  >
                    {playingVideoId === card.id ? (
                      <Pause className="h-4 w-4 text-orange-600" />
                    ) : (
                      <Play className="h-4 w-4 text-orange-600" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCheck(card.id)}
                    className={`rounded-full transition-colors ${
                      checkedVideos.has(card.id)
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-orange-100 hover:bg-orange-200"
                    }`}
                  >
                    <Check
                      className={`h-4 w-4 ${
                        checkedVideos.has(card.id)
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
              You&apos;ve completed {checkedVideos.size} out of{" "}
              {videoCards.length} videos in this section!
            </p>
            <Button className="bg-orange-500 font-semibold hover:bg-orange-600">
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LearnWithVideosPage;
