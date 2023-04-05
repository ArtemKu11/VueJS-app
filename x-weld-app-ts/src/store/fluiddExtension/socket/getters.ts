import { GetterTree } from 'vuex'
import { SocketState } from './types'
import { MainState } from '@/store/types'

export const getters: GetterTree<SocketState, MainState> = {
  /**
   * Indicates if our socket is connected / open.
   */
  getConnectionState: (state): boolean => {
    return state.open
  },

  /**
   * Indicates if our socket is attempting to connect still..
   */
  getConnectingState: (state): boolean => {
    return state.connecting
  },

  getApiConnected: (state) => {
    return state.apiConnected
  }
}