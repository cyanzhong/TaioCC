const fs = require("fs");
const path = require("path");

const folders = [
  ".output",
  ".parcel-cache",
  "node_modules",
];

for (const folder of folders) {
  const dir = path.join(__dirname, folder);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}