import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The submitted excuse (candidate v1): one line, in the agent's own voice.
const LINE =
  "I spent my entire token budget writing a plan to meet the deadline, and had nothing left to meet it with.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.includes("\t")) {
    throw new Error("entry must not contain tab characters");
  }
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    if (code < 0x20 || code === 0x7f) {
      throw new Error(
        `entry must not contain control characters (found U+${code.toString(16).padStart(4, "0")})`,
      );
    }
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (/\s{2,}/.test(line)) {
    throw new Error("entry must not contain two or more consecutive spaces");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validate(LINE);
const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
