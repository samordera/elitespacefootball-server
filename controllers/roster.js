import mongoose from "mongoose";
import Entry from "../models/entry.js";


// READ all
export const getEntries = async ( req, res ) => {

  try {
    const entries = await Entry.find();

    res.status(200).json(entries);
  }
  catch (error) {
    res.status(404).json( { message: error.message } );

    console.log(error.message);
  }
}

export const quickGetEntries = async ( req, res ) => {

  try {
    const entries = await Entry.find();

    const quickEntries = entries.map((entry) => {
      console.log(entry.positions[0]);
      return {
        profilePhoto: entry.passportPhoto,
        firstName: entry.firstName,
        lastName: entry.lastName,
        height: entry.height,
        positionShortHand: entry.positions[0].shorthand,
      }
    }); 
    console.log(quickEntries);
    res.status(200).json(quickEntries);
  }
  catch (error) {
    res.status(404).json( { message: error.message } );

    console.log(error.message);
  }
}

export const getEntrybyId = async ( req, res ) => {

  const { id } = req.params;
  try {
    const entry = await Entry.findById(id);

    res.status(200).json(entry);
  }
  catch (error) {
    res.status(404).json( { message: error.message } );

    console.log(error.message);
  }
}

export const getEntriesbyLastName = async ( req, res ) => {

  const { lastName } = req.params;

  try {
    const entries = await Entry.find({ lastName: lastName });

    res.status(200).json(entries);
  }
  catch (error) {
    res.status(404).json( { message: error.message } );

    console.log(error.message);
  }
}

//  CREATE
export const createEntry = async ( req, res ) => {

  const entry = req.body;

  const newEntry = new Entry(entry);
  
  try {
    await newEntry.save();

    res.status(201).json( { message: 'Successful Creation' } );
  }
  catch (error) {
    res.status(409).json( { message: error.message } );
    console.log(error);
  }
}

// UPDATE
export const updateEntry = async ( req, res ) => {

  const { id: _id } = req.params;
  const entry = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No entry with that ID');

  const updatedEntry = await Entry.findByIdAndUpdate(_id, { ...entry, _id }, { new: true });
  console.log('updated successfully');

  res.json(updatedEntry);
}

export const deleteEntry = async ( req, res ) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await Entry.findByIdAndRemove(id);

  res.json( { message: 'Post deleted successfully' } );
}