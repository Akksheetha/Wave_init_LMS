module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },

        requireModule: [
            "tsx/cjs"
        ],

        require: [
            "src/test/step/**/*.ts",
            "src/test/hooks/**/*.ts",
            "src/test/world/**/*.ts"
        ],

        paths: [
            "src/test/feature/**/*.feature"
        ],

        publishQuiet: true,

        dryRun: false,

        format: [
            "progress",
            "html:report/cucumber-html-report/cucumber-report.html",
            "json:report/cucumber-json-report/report.json",
            "allure-cucumberjs/reporter:allure-results",
            "rerun:rerun/rerun.txt"
        ]
    }
};