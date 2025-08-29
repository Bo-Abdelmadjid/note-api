import Note from "../models/noteModel.js";

// Get all Notes!

export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Get Note

export const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).json({
        message: "Note not found!",
      });

    res.json(note);
  } catch (error) {
    next(error);
  }
};

// Create a note

export const createNote = async (req, res, next) => {
  try {
    const newNote = req.body;
    await Note.create(newNote);
    res.status(201).json({
      message: "Note created successfully!",
      note: newNote,
    });
  } catch (error) {
    next(error);
  }
};

// Update note

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note)
      return res.status(404).json({
        message: "Note not found!",
      });
    res.json({
      message: "Note updated successfully!",
      note: note,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a note

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note)
      return res.status(404).json({
        message: "Note not found!",
      });
    res.status(200).json({
      message: "Note deleted successfully!",
    });
  } catch (error) {
    next();
  }
};
