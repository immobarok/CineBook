import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ChooseDate = ({
  dateTime,
  id,
}: {
  dateTime: Record<string, unknown>;
  id?: string;
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const onBookHandler = () => {
    if (!selected) {
      return toast.error("Select a date");
    }
    if (!id) {
      return toast.error("Missing movie id");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };
  return (
    <div className="pt-10" id="dateSelect">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-2xl">
        <div
          className="absolute w-96 h-96 rounded-full bg-primary/30 blur-3xl opacity-70 top-0 -right-40 -z-10 animate-none"
          data-aos="fade-left"
        />
        <div
          className="absolute w-64 h-64 rounded-full bg-secondary/30 blur-2xl opacity-60 bottom-20 -left-20 -z-10 animate-none"
          data-aos="fade-right"
        />
        <div>
          <p className="text-lg font-semibold">Choose Date </p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeft width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex flex-col item-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${
                    selected === date
                      ? "bg-primary text-white"
                      : "border border-primary/70"
                  }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRight width={28} />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ChooseDate;
