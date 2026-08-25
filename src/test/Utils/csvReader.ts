import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export function readCsvData<T>(filename: string): T[] {
    const filepath = path.resolve(__dirname, "../testData", filename);

    const content = fs.readFileSync(filepath, "utf-8");

    return parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    }) as T[];
}