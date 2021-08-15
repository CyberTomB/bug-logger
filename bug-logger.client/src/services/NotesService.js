import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'

class NotesService {
  async getAllByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    logger.log(res.data)
    AppState.notes = res.data
  }

  async create(body) {
    if (AppState.user.isAuthenticated) {
      const res = await api.post('api/notes', body)
      logger.log(res.data)
      AppState.notes.unshift(res.data)
    } else {
      Pop.toast('You must be logged in', 'error')
    }
  }
}

export const notesService = new NotesService()
