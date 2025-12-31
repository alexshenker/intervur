/**
 * Exports questionsSansAnswers to a JSON file for easy viewing
 *
 * Usage: npm run export-questions
 *
 * This creates questionsSansAnswers.json in the project root,
 * allowing you to visually inspect all available questions at any time.
 */

import * as fs from "fs";
import * as path from "path";
import { questionsSansAnswers } from "../seed/seed";

const outputPath = path.join(process.cwd(), "questionsSansAnswers.json");

fs.writeFileSync(outputPath, JSON.stringify(questionsSansAnswers, null, 2));

console.log(`✓ Exported ${questionsSansAnswers.length} questions to questionsSansAnswers.json`);
