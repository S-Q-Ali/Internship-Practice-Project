import headphone from "../../assets/headphones/headphone_1.png";
import keyboard from "../../assets/keyborads/keyboard_1.png";
import mouse from "../../assets/mouses/mouse_1.png";
import speaker from "../../assets/speakers/speaker_1.png";

export default function CategorySection() {
  return (
    <section className="flex w-full bg-gradient-to-b from-black to-zinc-950 py-16">
      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-amber-50 text-3xl font-semibold m-8">
          SHOP BY CATEGORY
        </h1>

        <div className="flex gap-10 flex-wrap justify-center ">
          <img
            src={headphone}
            alt="Headphone Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
          />
          <img
            src={keyboard}
            alt="Keyboard Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
          />
          <img
            src={mouse}
            alt="Mouse Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
          />
          <img
            src={speaker}
            alt="Speaker Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
