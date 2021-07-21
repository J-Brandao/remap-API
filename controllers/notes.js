const express = require("express");
const checkJwt = require("../utils/checkJwt");
const { getAll, create } = require("../models/notes");
const NoteSchema = require('../utils/NoteSchema');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: All things related to notes and stuff
 * components:
 *   schemas:
 *     NewNote:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the note.
 *         body:
 *           type: string
 *           description: The body of the note.
 *     Note:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto generated ID of the note.
 *         title:
 *           type: string
 *           description: The title of the note.
 *         body:
 *           type: string
 *           description: The body of the note.
 */

/**
 * @swagger
 *
 * /notes:
 *   get:
 *     summary: Gets a list of notes
 *     tags: [Notes]
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: The list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Note"
 *   post:
 *     summary: Creates a note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NewNote"
 *     responses:
 *       "201":
 *         description: The note was created correctly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Note"
 *       "400":
 *         description: The request was sent with an invalid body.
 */

router.route("/")
  .get(async (req, res) => {
    const notes = await getAll();

    res.status(200);
    res.json(notes);
    res.end();
  })
  .post(async (req, res) => {
    try {
      await NoteSchema.validate(req.body);
    }
    catch (e) {
      res.status(400);
      res.send(e.errors);
      res.send();
      return;
    }
    const note = await create(req.body);
    res.json(note);
    res.status(201);
    res.end();
  });

module.exports = router;