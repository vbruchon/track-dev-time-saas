#!/usr/bin/env node

import { sendTrialEmail } from "@/lib/cron/send-trial-email";
import { prisma } from "@/lib/prisma";

async function main() {
  await sendTrialEmail();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
