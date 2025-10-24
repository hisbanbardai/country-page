import heroImg from "../assets/hero-image.jpg";

export default function Hero() {
  return (
    <img
      className="w-full h-[250px] md:h-[350px] object-cover"
      src={heroImg}
      alt="hero-image"
    />
  );
}
