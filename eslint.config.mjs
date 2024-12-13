import globals from "globals";
import eslint from "@eslint/js";
import ts_eslint from "typescript-eslint";
import eslint_config_prettier from "eslint-config-prettier";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { includeIgnoreFile } from "@eslint/compat";

const __dirname = dirname(fileURLToPath(import.meta.url));
const gitignorePath = join(__dirname, ".gitignore");

export default ts_eslint.config(
    includeIgnoreFile(gitignorePath),
    eslint.configs.recommended,
    ...ts_eslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "prefer-const": [
                "error",
                {
                    destructuring: "all",
                },
            ],
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
    eslint_config_prettier,
);
