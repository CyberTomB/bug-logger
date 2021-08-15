import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getAllByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    logger.log(res.data)
    AppState.notes = res.data
  }
}

export const notesService = new NotesService()
