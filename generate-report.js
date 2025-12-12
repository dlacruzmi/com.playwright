import reporter from "cucumber-html-reporter";

const options = {
  theme: "bootstrap",
  jsonFile: "reports/json/report.json",
  output: "reports/html/report.html",
  screenshotsDirectory: "reports/screenshots",
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true
};

reporter.generate(options);