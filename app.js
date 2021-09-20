require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./router');

const swaggerOptions = require('./swaggerOptions');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const specs = swaggerJsDoc(swaggerOptions);

const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 2115;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
// Обрабочик ошибок, последний middleware
app.use(errorHandler);


const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log(`SERVER STARTED IN PORT ${PORT}`));

	} catch (e) {
		console.log(e);
	}
};



start();



