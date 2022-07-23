const {init: slackInit} = require('./slack/slack');

class Reporter {

  reporters = [];
  constructor({ slack } = {}) {
    if (slack) {
      const slackInstance = slackInit(slack.url);
      this.reporters.push(slackInstance);
    }

  }

  async report(result) {
    const reports = this.reporters.map(async reporter => reporter.report(result));
    await Promise.all(reports);
  }
}
module.exports = {
  Reporter
};
