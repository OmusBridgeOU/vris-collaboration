import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function audit_file(path, bytes) {
  const findings = [];
  if (
    /(^|\/)(\.git|\.worktrees|\.pnpm-store|node_modules|\.wrangler|\.codex-visual|backups|handoff)(\/|$)|(^|\/)\.env[^/]*$|(^|\/)\.dev\.vars[^/]*$|\.(log|db|sqlite|pem|key|pfx|p12)$|(^|\/)(wrangler\.(test\.toml|production\.json|toml|jsonc?)|deployment_secrets\.json)$/.test(
      path,
    )
  ) {
    findings.push("private or generated path");
  }
  const text = bytes.toString("utf8");
  const rules = [
    ["private key", /-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/],
    [
      "access token",
      /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|AKIA[A-Z0-9]{16})\b/,
    ],
    [
      "deployed preview URL",
      /https?:\/\/[a-z0-9.-]+\.(?:workers|pages)\.dev\b/i,
    ],
    [
      "local user path",
      /(?:[a-z]:[\\/](?:Users|WorkSpace)[\\/][^\s"'<>]+|\/(?:Users|home)\/[a-z0-9_.-]+\/)/i,
    ],
    ["test deployment identifier", /\bvris[-_]badge[-_]test\b/i],
  ];
  for (const [label, pattern] of rules) {
    if (pattern.test(text)) findings.push(label);
  }
  return findings;
}

export function audit_tree(root, files) {
  const findings = [];
  for (const file of files) {
    const path = resolve(root, file);
    if (!existsSync(path)) continue;
    if (lstatSync(path).isSymbolicLink()) {
      findings.push(`${file}: symbolic link is not allowed`);
      continue;
    }
    for (const finding of audit_file(file, readFileSync(path))) {
      findings.push(`${file}: ${finding}`);
    }
  }
  return findings;
}

function tree_files(root, prefix = "") {
  return readdirSync(resolve(root, prefix), { withFileTypes: true }).flatMap(
    (entry) => {
      const file = prefix + entry.name;
      return entry.isDirectory() ? tree_files(root, file + "/") : [file];
    },
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const root = resolve(process.argv[2] || ".");
  const files = process.argv[2]
    ? tree_files(root)
    : execFileSync(
        "git",
        ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
        { encoding: "utf8" },
      )
        .split("\0")
        .filter(Boolean);
  const findings = audit_tree(root, files);
  if (findings.length) {
    console.error(findings.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `PASS: ${files.length} candidate files checked for prohibited paths and known sensitive patterns (not a guarantee against every secret).`,
    );
  }
}
