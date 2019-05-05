const express = require('express');
const router = new express.Router();
const Session = require('../models/session');

// Creates a session
router.post('/sessions', async (req, res) => {
  const session = new Session(req.body);

  try {
    await session.save();
    res.status(201).send(session);
  } catch (e) {
    res.status(500).send({ error: 'Error creating user' })
  }
});

// Get all sessions
router.get('/sessions', async (req, res) => {
  try {
    const allSessions = await Session.find({});
    if (!allSessions.length) {
      return res.status(404).send();
    }
    res.status(200).send(allSessions);
  } catch (e) {
    res.status(500).send({ error: 'could not get data' });
  }
})

// Get one session
router.get('/sessions/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const session = await Session.findById(_id);
    if (!session) {
      return res.status(404).send();
    }
    res.status(200).send(session);
  } catch (e) {
    res.status(500).send({ error: 'Could not get data' });
  }
});

// Update a session
router.patch('/sessions/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const values = ['location', 'buyin', 'tableLimit', 'cashout'];

  const isValid = updates.every((update) => {
    return values.includes(update);
  })

  if (!isValid) {
    return res.status(400).send({ error: 'Property not present' });
  }

  try {
    const update = await Session.findByIdAndUpdate(_id, req.body, { new: true });

    res.status(200).send(update);
  } catch (e) {
    res.status(500).send({ error: 'Could not update' });
  }
});

// Delete a session
router.delete('/sessions/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const session = await Session.findByIdAndDelete(_id);

    if (!session) {
      return res.status(404).send();
    }
    res.status(200).send(session);
  } catch (e) {
    res.status(500).send({ error: 'Could not delete data' });
  }
})

// Delete all sessions
router.delete('/sessions', async (req, res) => {
  try {
    await Session.deleteMany({});
    res.status(200).send();
  } catch (e) {
    res.status(500).send({ error: 'Could not delete data' });
  }
})

module.exports = router;