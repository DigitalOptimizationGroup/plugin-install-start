const spawn = require("cross-spawn");

export const execSync = (command: string, args: Array<string>) => {
  const proc = spawn.sync(command, args, { stdio: "inherit" });
  if (proc.status !== 0) {
    throw Error("Failed to install plugin");
  }
  return;
};
