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

  async destroy(note) {
    if (AppState.user.isAuthenticated && AppState.account.id === note.creator.id) {
      const res = await api.delete('api/notes/' + note.id)
      Pop.toast(res.data.message, 'success')
      AppState.notes = AppState.notes.filter(n => n.id !== note.id)
    } else {
      Pop.toast('This is not your note.', 'error')
    }
  }
}

export const notesService = new NotesService()
