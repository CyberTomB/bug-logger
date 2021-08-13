import { dbContext } from '../db/DbContext'

class BugsService {
  async create(body) {
    const bug = await dbContext.Bug.create(body)
    return await dbContext.Bug.findById(bug._id).populate('creator')
  }
}

export const bugsService = new BugsService()
