import fs from "fs/promises";
import path from "path";

const distDir = path.resolve("./dist");

async function fixImportsInFile(filePath) {
  let content = await fs.readFile(filePath, "utf-8");

  content = content.replace(
    /(from\s+['"])(\.\.?\/[^'"]+)(['"])/g,
    (match, p1, p2, p3) => {
      // Si pas déjà avec extension
      if (!/\.[a-zA-Z0-9]+$/.test(p2)) {
        // Cas spécial : generated
        if (
          p2.endsWith("/generated") ||
          p2 === "./generated" ||
          p2 === "../generated"
        ) {
          return `${p1}${p2}/index.js${p3}`;
        }
        return `${p1}${p2}.js${p3}`;
      }
      // Cas spécial si quelqu’un a mis generated.js → on remplace aussi
      if (p2.endsWith("generated.js")) {
        return `${p1}${p2.replace(/generated\.js$/, "generated/index.js")}${p3}`;
      }
      return match;
    }
  );

  await fs.writeFile(filePath, content, "utf-8");
}

async function walkDir(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await walkDir(fullPath);
    } else if (file.name.endsWith(".js")) {
      await fixImportsInFile(fullPath);
    }
  }
}

walkDir(distDir)
  .then(() => console.log("Imports fixed"))
  .catch(console.error);
