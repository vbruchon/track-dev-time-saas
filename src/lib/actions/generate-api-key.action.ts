"use server";

import { randomBytes } from "crypto";

export const generateApiKey = async (): Promise<string> => {
  const prefix = "tdt_sk_";
  const bytes = randomBytes(24);
  const base64url = bytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return prefix + base64url;
};
