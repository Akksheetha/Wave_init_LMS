import { generate } from "multiple-cucumber-html-reporter";
import * as os from "os";

generate({
    jsonDir: "./report/cucumber-json-report",

    reportPath: "./report/reports/html",

    reportName: "Wave init LMS Report",

    pageTitle: "Wave init LMS Report",

    displayDuration: true,

    openReportInBrowser: false,

    metadata: {
        browser: {
            name: process.env.BROWSER || "chromium",
            version: "Latest",
        },

        device: os.hostname(),

        executionPlatform: "local",

        platform: {
            name: os.platform(),
            version: os.release(),
        },
    },

    customData: {
        title: "Execution Info",

        data: [
            {
                label: "Project",
                value: "Wave init LMS",
            },
            {
                label: "Framework",
                value: "Playwright + TypeScript + Cucumber",
            },
            {
                label: "Environment",
                value: process.env.ENV || "QA",
            },
            {
                label: "Executed On",
                value: new Date().toLocaleString(),
            },
        ],
    },
});