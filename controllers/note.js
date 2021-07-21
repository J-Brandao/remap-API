const express = require("express");
const checkJwt = require("../utils/checkJwt");
const { get, update, remove } = require("../models/notes");
const NoteSchema = require('../utils/NoteSchema');

const router = express.Router();

/**
 * @swagger
 *
 * /notes/{id}:
 *   get:
 *     summary: Gets a note with a given ID
 *     tags: [Notes]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       "200":
 *         description: The note with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Note"
 *       "404":
 *         description: The note was not found in the database.
 *   put:
 *     summary: Updates a note with a given ID
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Note"
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       "200":
 *         description: The note with the given ID was updated correctly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Note"
 *       "400":
 *         description: The request was sent with an invalid body.
 *   delete:
 *     summary: Deletes a note with a given ID
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       "200":
 *         description: The note with the given ID was deleted correctly.
 */

router.route("/:id")
  .get(async (req, res) => {
    const note = await get(req.params.id);
    if (!note) {
      res.status(404);
      res.end();
      return;
    }
    res.status(200);
    res.json(note);
    res.end();
  })
  .put(checkJwt, async (req, res) => {
    try {
      await NoteSchema.validate(req.body);
    }
    catch (e) {
      res.status(400);
      res.send(e.errors);
      res.end();
      return;
    }
    await update(req.params.id, req.body);

    res.json({ id: req.params.id, ...req.body });
    res.status(200);
    res.end();
  })
  .delete(checkJwt, async (req, res) => {
    await remove(req.params.id);

    res.status(200);
    res.end();
  })
 
module.exports = router;