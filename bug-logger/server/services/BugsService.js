import { dbContext } from '../db/DbContext'

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bug.find(query).populate('creator')
  }

  async getById(id) {
    return await dbContext.Bug.findById(id)
  }

  async create(body) {
    const bug = await dbContext.Bug.create(body)
    return await dbContext.Bug.findById(bug._id).populate('creator')
  }
}

export const bugsService = new BugsService()
