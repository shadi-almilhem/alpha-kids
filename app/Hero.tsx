import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative mt-44 mt-32">
      <section className="mt-12 z-20 relative mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 z-10 flex-1 sm:text-center lg:text-left">
          <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl !leading-tight tracking-tight">
            Discover the Joy of Learning French,
            <span className="text-orange-600"> One Word at a Time!</span>
          </h1>
          <p className="text-gray-500 max-w-xl leading-normal sm:mx-auto lg:ml-0">
            Explore French with fun songs, cute drawings, and playful
            videos—learning has never been this exciting!
          </p>
          <div>
            <button className="outline-none bg-orange-600 text-white text-center px-4 py-3 rounded-md shadow w-full ring-offset-2 ring-gray-700 focus:ring-2  sm:w-auto">
              <Link href="#learning-section">Start Learning French</Link>
            </button>
          </div>
        </div>
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
          <Image
            width={1000}
            height={500}
            alt="children learning french"
            src="/assets/images/hero-section-image.png"
            className="w-full mx-auto sm:w-10/12  lg:w-full"
          />
        </div>
      </section>

      <div
        className="absolute z-0 inset-0 blur-xl h-full"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(249, 193, 121, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
    </main>
  );
}
