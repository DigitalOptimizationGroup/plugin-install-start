/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import { Command, flags } from "@oclif/command";
import * as inquirer from "inquirer";
import { execSync } from "../exec-sync";

export default class Dev extends Command {
  static description = `run a local server for development`;

  public static flags = {
    port: flags.integer({
      char: "p"
    }),
    script: flags.string({
      char: "s"
    })
  };

  static args = [];

  public async run() {
    const { args, flags } = this.parse(Dev);

    const answer: { answer: string } = await inquirer.prompt([
      {
        type: "list",
        name: "answer",
        message:
          "The development server is shipped as a CLI plugin. Would you like us to install it now?",
        choices: ["Yes", "No"]
      }
    ]);

    if (answer.answer === "No") {
      this.log("Exiting...");
      process.exit();
    }

    this.log("Installing plugin...");

    try {
      execSync(`dog`, ["plugins:install", "@digitaloptgroup/plugin-start"]);
      this.log();
      this.log(`
Plugin installed successfully. You can now run:

dog start --port 3000
`);
    } catch (e) {
      this.log();
      this.log(
        "Unable to install dependencies, please try again or let us know."
      );
      this.log();
      process.exit();
    }
  }
}
