import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        domain: true,
        branch: true,
        year: true,
        createdAt: true,
      },
    });

    console.log("=== USER DATABASE REPORT ===");
    console.log(`Total Users Count: ${users.length}`);
    console.log("User List:");
    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error querying database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
