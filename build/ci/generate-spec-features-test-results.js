const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
  inputJsonFile: 'test-results/spec-features.json',
  outputXmlFile: 'test-results/spec-features.xml',
}

cucumberJunitConvert.convert(options);
