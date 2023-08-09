const mailController = require('./mailController')

module.exports = function (app) {
app.post('/espcharts/subscribe', mailController.sendConfirmEmailfromServer);
app.get('/espcharts/confirm/:token', mailController.confirmToken);
app.delete('/espcharts/subscriber',mailController.deleteUnsubscribed);
app.delete('/espcharts/subscriber/:id', mailController.deleteEmail)
app.get('/espcharts/subscribers',mailController.getAllEmails);
app.get('/espcharts/subscriber',mailController.paginatedEmails);
app.post('/espcharts/sendNewsletter',mailController.sendNewsletter);
}