import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { botId: string } },
) {
  try {
    const body = await req.json();
    const { imageSource, name, description, categoryId, preamble, seedChat } =
      body;

    if (
      !imageSource ||
      !name ||
      !description ||
      !categoryId ||
      !preamble ||
      !seedChat
    ) {
      return new NextResponse("Required fields are missing", { status: 400 });
    }

    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const memberships =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: process.env.CLERK_ORGANIZATION_ID!,
      });

    const isAdmin = memberships
      .map((member) => member.publicUserData?.userId === user.id)
      .includes(true);

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const bot = await prismadb.bot.update({
      where: {
        id: params.botId,
      },
      data: {
        userId: user.id,
        imageSource,
        name,
        description,
        categoryId,
        preamble,
        seedChat,
      },
    });

    return NextResponse.json(bot);
  } catch (error) {
    console.log("BOT_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { botId: string } },
) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const memberships =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: process.env.CLERK_ORGANIZATION_ID!,
      });

    const isAdmin = memberships
      .map((member) => member.publicUserData?.userId === user.id)
      .includes(true);

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const bot = await prismadb.bot.delete({
      where: {
        id: params.botId,
      },
    });

    return NextResponse.json(bot);
  } catch (error) {
    console.log("BOT_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
