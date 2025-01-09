import GradualSpacing from "@/components/ui/gradual-spacing";

export default function Hero() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div
        className="absolute bg-cover bg-center filter blur-sm h-full w-full"
        style={{ backgroundImage: "url('/bg-landing_page.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative flex-grow bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        <GradualSpacing
          className="font-display text-center text-4xl mb-4 font-bold -tracking-widest text-white md:text-7xl md:leading-[5rem]"
          text="Bem-vindo à plataforma do"
        />
        <GradualSpacing
          className="font-display text-center text-4xl mb-4 font-bold -tracking-widest text-white md:text-7xl md:leading-[5rem]"
          text="Candelária Sport Clube"
        />
      </div>
    </div>
  );
}
