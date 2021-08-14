import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

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

  async destroy(id, userId) {
    const note = await dbContext.Note.findById(id)
    if (!note) {
      throw new BadRequest('Note Doesn\'\t seem to exist.')
    }
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your note.')
    }
    return await dbContext.Note.findByIdAndDelete(id)
  }
}

export const notesService = new NotesService()
