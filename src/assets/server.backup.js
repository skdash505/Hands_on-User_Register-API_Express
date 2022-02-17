
//* define Port */
// const port = 3000;
// app.listen(port, () => console.log(`listening on http://localhost:${port}`));

/* define Swagger-Ui */
// const swaggerDocument = require('./routes/swaggerUi/swagger.js');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./routes/swagger/swagger.json');
// console.log(swaggerDocument);
// app.use('/api/swaggerUi', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true}));

/* initiate App */
// const controllers = require('./routes/controllers/controllers');

/* Handel Invalid Url */
// app.use(express.static(__dirname));

 /* type-1 **/
// app.use('*', function(req, res, next){
//     var options = {
//         root: path.join(__dirname)
//     };
//     var fileName = 'index.html';
//     res.sendFile(fileName, options, function (err) {
//         if (err) {
//             next(err);
//         } else {
//             console.log('Sent:', fileName);
//             next();
//         }
//     });
// });

 /* type-2 **/
// app.get('*', function(req, res, next){
//     var options = {
//         root: path.join(__dirname)
//     };     
//     var fileName = 'index.html';
//     res.sendFile(fileName, options, function (err) {
//         if (err) {
//             next(err);
//         } else {
//             console.log('Sent:', fileName);
//         }
//     });
// });

 /* type-3 **/
// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, {root: path.join(__dirname)});
// });
