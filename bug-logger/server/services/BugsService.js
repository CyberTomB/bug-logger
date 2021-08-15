import { dbContext } from '../db/DbContext'

import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bug.find(query).populate('creator')
  }

  async getById(id) {
    return await dbContext.Bug.findById(id).populate('creator', 'name picture')
  }

  async create(body) {
    const bug = await dbContext.Bug.create(body)
    return await dbContext.Bug.findById(bug._id).populate('creator')
  }

  async edit(updatedBug) {
    const bug = await this.getById(updatedBug.id)
    if (bug.closed) {
      throw new BadRequest('This bug is closed, foo!')
    }
    if (!bug) {
      throw new BadRequest('Invalid ID')
    }
    if (bug.creatorId.toString() !== updatedBug.creatorId) {
      throw new Forbidden('You did not create this bug.')
    }
    const afterUpdate = await dbContext.Bug.findByIdAndUpdate(updatedBug.id, updatedBug, { new: true, runValidators: true })
    return afterUpdate
  }

  async close(bug, id) {
    const reqBug = await this.getById(bug.id)
    if (!reqBug) {
      throw new BadRequest('Invalid ID')
    }
    if (reqBug.creatorId.toString() !== id) {
      throw new Forbidden('You did not create this bug and cannot close it!')
    }
    reqBug.closed = true
    const afterUpdate = await dbContext.Bug.findByIdAndUpdate(reqBug.id, reqBug, { new: true, runValidators: true }).populate('creator')
    return afterUpdate
  }
}

export const bugsService = new BugsService()
