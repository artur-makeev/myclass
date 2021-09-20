const Router = require('express');
const router = new Router();
const controller = require('./controller.js');


/**
 * @swagger
 * components:
 *  schemas:
 *     Lessons:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         date:
 *           type: string
 *         title:
 *           type: string
 *         status:
 *           type: integer
 *         visitCount:
 *           type: integer
 *         students:
 *           type: array
 *         teachers:
 *           type: JSONB
 *       example:
 *         id: 3
 *         date: 2019-09-03
 *         title: Orange Color
 *         status: 1
 *         visitCount: 0
 *         students: [] 
 *         teachers: {"id": 3, "name": "Angelina"}
 */

/**
  * @swagger
  * tags:
  *   name: My Class
  *   description: API for lessons database
  */

/**
  * @swagger
  * /:
  *   get:
  *     summary: Retuns list of lessons
  *     tags: [My Class]
  *     parameters:
  *       - in: query
  *         name: lessonsPerPage
  *         schemas:
  *           type: integer
  *         description: Maximum number of comapnies displayed on a single page
  *       - in: query
  *         name: page
  *         schemas:
  *           type: integer
  *         description: Page number
  *       - in: query
  *         name: date
  *         schemas:
  *           type: string
  *         description: Date in format 'YYYY-MM-DD'
  *       - in: query
  *         name: status
  *         schemas:
  *           type: integer
  *         description: Status of lesson (Value 0 or 1)
  *     responses:
  *       200:
  *         description: List of lessons
  *         content:
  *           application/json:
  *             type: json
  *             items:
  *               $ref: '#/components/schemas/Lessons'
  *       400:
  *         description: Bad request
  *       500:
  *         description: Unhandled error
  */

router.get('/', controller.getData);

/**
 * @swagger
 * components:
 *  schemas:
 *     LessonPost:
 *       type: object
 *       properties:
 *         teacherIds:
 *           type: array
 *         date:
 *           type: string
 *         title:
 *           type: string
 *         days:
 *           type: array
 *         firstDate:
 *           type: string
 *         lessonsCount:
 *           type: integer
 *         lastDate:
 *           type: string
 *       example:
 *         teacherIds: 1
 *         title: Blue Ocean
 *         days: [0, 1, 3, 6]
 *         firstDate: 2019-09-10
 *         lessonsCount: 4
 */

/**
* @swagger
* /lessons:
*   post:
*     summary: Creates lessons and returns list of created lessons` ids
*     tags: [My Class]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/LessonPost'
*     responses:
*       200:
*         description: List of lessons
*       400:
*         description: Bad request
*       500:
*         description: Unhandled error
*/



router.post('/lessons', controller.postData);


module.exports = router;