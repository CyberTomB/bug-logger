import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('api/bugs')
      logger.log(res.data)
      AppState.bugs = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async getOneById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      logger.log(res.data)
      AppState.chosenBug = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async create(body) {
    try {
      const res = await api.post('api/bugs', body)
      logger.log(res.data)
      AppState.bugs.unshift(res.data)
      return res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async edit(newBug, oldBug) {
    if (oldBug.closed) {
      Pop.toast('This bug is closed!')
    }
    if (AppState.user.isAuthenticated && AppState.account.id === oldBug.creator.id) {
      try {
        const res = await api.put('api/bugs/' + oldBug.id, newBug)
        Pop.toast('Bug edited', 'success')
      } catch (error) {
        Pop.toast(error)
      }
    } else {
      Pop.toast('You cannot edit this bug!')
    }
  }

  async close(bug) {
    if (AppState.user.isAuthenticated && AppState.account.id === bug.creator.id) {
      try {
        const res = await api.delete('api/bugs/' + bug.id)
        console.log(res.data)
        AppState.chosenBug = res.data
        Pop.toast('Bug closed.', 'success')
      } catch (error) {
        Pop.toast(error)
      }
    } else {
      Pop.toast('You cannot close this bug!')
    }
  }
}

export const bugsService = new BugsService()
