
/**
*@swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - firstName
*         - lastName
*         - disabled
*       properties:
*         id:
*           type: integer
*           description: The auto - generated id of the user.
*         firstName:
*           type: string
*           description: The firstName of your User.
*         lastName:
*           type: string
*           description: The lastName of your User.
*         disabled:
*           type: boolean
*           description: Hdid this user is disabled ?
*         createdAt:
*           type: string
*           format: date
*           description: The date of the record creation.
*       example:
*          firstName: Santanu
*          lastName: Dash
*          locked: false
*/

const router = require('express').Router();

module.exports = router;