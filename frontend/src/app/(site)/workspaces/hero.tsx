import Title from "@/components/site/common/title";

export default function Hero() {
  return (
    <div className="relative bg-white min-h-[26rem] flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-5 left-5 w-20 h-20 bg-sky-100 rounded-full opacity-50" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-sky-100 rounded-full opacity-50" />
      <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-sky-100 rounded-full opacity-50" />
      <div className="absolute bottom-2 right-1/3 w-24 h-24 border-2 border-sky-200 rounded-full" />
      <div className="absolute bottom-20 left-10 w-32 h-8 bg-sky-100 rounded-full transform rotate-12" />
      {/* <div className="absolute top-1/3 right-5 w-32 h-8 bg-sky-100 rounded-full transform -rotate-12" /> */}
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-sky-50 rounded-sm rotate-45" />

      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-4xl">
        <Title className="font-bold text-balance mb-6 text-gray-800">
          Inspiring Flexible Desk options that let&apos;s work at your comfort
        </Title>
        <p className="text-lg text-gray-600 mb-8">
          Work in absolute freedom at our Flexi Desks! You and your laptop,
          immersed in a network of ideas.
        </p>
      </div>
    </div>
  );
}
