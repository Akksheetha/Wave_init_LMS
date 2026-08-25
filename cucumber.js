module.exports={
    default:{
        "formatOptions":{
            "snippetInterface":"async-await"
        },
        requireModule:[
            "tsx/cjs"
        ],

        require:[
            "src/test/step/**/*.ts",
            "src/test/hooks/**/*.ts",
            "src/test/world/**/*.ts",
           
        ],

        

        paths:[
            "src/test/feature/**/*.feature",
        ],

        publishQuiet:true,
        dryRun:false,  //false for real automation

        format: [
            "progress",
            "html:Report/cucumber-html-report/cucumber-report.html",
             "json:Report/cucumber-json-report/report.json",
             "allure-cucumberjs/reporter:report/allure/report/allure-results",
            "rerun:rerun/rerun.txt"
]

    }
};
