import prismadb from "@/lib/prismadb";
import ChatCard from "../../_components/chat-card";
import CategoryPicker from "../../_components/category-picker";

const AppPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="flex-1 flex-col">
      <section className="mb-36">
        <div className="container">
          <div className="flex flex-col items-center">
            <CategoryPicker categories={categories} />
            <div className="grid grid-cols-4 gap-9">
              {/* <ChatCard
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
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;
