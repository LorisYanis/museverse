import { cn } from "@/lib/utils";
import ChatCard from "../../_components/chat-card";

const CATEGORIES = [
  "All",
  "Innovators",
  "Writers",
  "Scientists",
  "Musician",
  "Painters",
  "Philosophers",
];
const ACTIVE = "All";

const App = () => {
  return (
    <div className="flex-1 flex-col">
      <section className="mb-36">
        <div className="container">
          <div className="flex flex-col items-center">
            <nav className="mt-16 mb-10 bg-zinc-900 p-1 rounded-lg">
              <ul className="space-x-2 font-medium text-sm">
                {CATEGORIES.map((category) => (
                  <li
                    className={cn(
                      "inline-block px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-950 hover:text-white transition-colors",
                      category === ACTIVE ? "bg-zinc-950 text-white" : "",
                    )}
                  >
                    <button type="button">{category}</button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid grid-cols-4 gap-9">
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
              <ChatCard
                image="/images/thumbnail.png"
                title="Steve Jobs"
                description="Founder & Former CEO of Apple of Apple"
                slug="steve_jobs"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
