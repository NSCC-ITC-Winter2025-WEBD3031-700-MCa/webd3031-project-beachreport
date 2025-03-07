import Image from "next/image";

const Bottom = () => {
  return (
    <div className="w-full h-screen relative">
      {/* Image */}
      <Image 
        src="/images/beach.jpg" 
        alt="beach picture" 
        layout="fill" 
        objectFit="cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent"></div>
    </div>
  );
};

export default Bottom;
