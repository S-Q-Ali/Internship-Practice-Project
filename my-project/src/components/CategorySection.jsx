import headphone from "../../assets/headphones/headphone_1.png";
import keyboard from "../../assets/keyborads/keyboard_3.png";
import mouse from "../../assets/mouses/mouse_3.png";
import speaker from "../../assets/speakers/speaker_3.png";
import { useNavigate } from "react-router-dom";

export default function CategorySection() {
    const navigate=useNavigate();
    const handleCategoryClick=(category)=>{
        navigate("/categories",{state:{scrollTo:category}});
    };
  return (
    <section className="flex w-full bg-gradient-to-b from-black to-zinc-950 py-16">
      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-amber-50 text-4xl font-semibold mb-14">
          SHOP BY CATEGORY
        </h1>

        <div className="flex gap-10 flex-wrap justify-center ">
          <img
            src={headphone}
            alt="Headphone Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
            onClick={()=>handleCategoryClick("headphones")}
          />
          <img
            src={keyboard}
            alt="Keyboard Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
            onClick={()=>handleCategoryClick("keyboard")}
          />
          <img
            src={mouse}
            alt="Mouse Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
          onClick={()=>handleCategoryClick("mouse")}
          />
          <img
            src={speaker}
            alt="Speaker Category"
            className="w-44 h-44 object-contain cursor-pointer hover:scale-110 transition-transform duration-300 border-2 border-purple-500 rounded-full"
          onClick={()=>{handleCategoryClick("speaker")}}
          />
        </div>
      </div>
    </section>
  );
}
