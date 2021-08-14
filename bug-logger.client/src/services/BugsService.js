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
}

export const bugsService = new BugsService()
