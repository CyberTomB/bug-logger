import { dbContext } from '../db/DbContext'

class NotesService {
  async create(body) {
    const note = await dbContext.Note.create(body)
    return await dbContext.Note.findById(note._id)
      .populate('creator', 'name picture')
      .populate('bug', '_id')
  }
}

export const notesService = new NotesService()
