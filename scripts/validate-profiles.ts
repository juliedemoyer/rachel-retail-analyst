import { parseAllProfiles, formatIssues } from "../lib/profiles/parse";
import { resolve } from "node:path";

async function main() {
  const dir = resolve(__dirname, "..", "data", "companies");
  const r = await parseAllProfiles(dir);
  let ok = 0;
  let bad = 0;
  for (const x of r) {
    if (x.ok && x.profile) {
      ok++;
      console.log(
        "OK ",
        x.profile.slug.padEnd(10),
        "-",
        x.profile.meta.company.padEnd(45),
        "quadrant:",
        x.profile.aiPerception.score.quadrant,
      );
    } else {
      bad++;
      console.log("FAIL", x.filePath);
      console.log(x.error);
      if (x.issues) console.log(formatIssues(x.issues));
    }
  }
  console.log(`\nTotal: ${ok} ok, ${bad} failed`);
  process.exit(bad > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
