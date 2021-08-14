import { dbContext } from '../db/DbContext'

class NotesService {
  async getAllByBugId(id) {
    const notes = await dbContext.Note.find({ bugId: id }).populate('creator', 'name picture').populate('bug')
    return notes
  }

  async create(body) {
    const note = await dbContext.Note.create(body)
    return await dbContext.Note.findById(note._id)
      .populate('creator', 'name picture')
      .populate('bug', '_id')
  }
}

export const notesService = new NotesService()
