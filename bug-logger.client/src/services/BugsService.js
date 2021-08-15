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
}

export const bugsService = new BugsService()
