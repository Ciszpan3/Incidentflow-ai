import "dotenv/config";
import { hash } from "bcryptjs";
import { prisma } from "../src/shared/db/prisma.js";

const email = process.env.DEMO_EMAIL ?? "demo@example.com";
const password = process.env.DEMO_PASSWORD;

if (!password || password.length < 8) {
  throw new Error("Set DEMO_PASSWORD with at least 8 characters");
}

const organization = await prisma.organization.findFirstOrThrow({
  orderBy: { createdAt: "asc" },
});

const passwordHash = await hash(password, 12);

await prisma.user.upsert({
  where: { email },
  update: { organizationId: organization.id, passwordHash },
  create: { email, organizationId: organization.id, passwordHash },
});

await prisma.$disconnect();