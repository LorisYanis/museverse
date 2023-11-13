import prismadb from "@/lib/prismadb";

import { BotCreateForm } from "../../../_components/bot-create-form";

const CreateBotPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="flex-1">
      <BotCreateForm currentBotData={null} categories={categories} />
    </div>
  );
};

export default CreateBotPage;
