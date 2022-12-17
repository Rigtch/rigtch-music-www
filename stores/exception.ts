import { defineStore } from 'pinia'

export enum ExceptionType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export enum ExceptionCollection {
  Global = 'global',
  TopArtists = 'topArtists',
  TopTracks = 'topTracks',
  LastTracks = 'lastTracks',
}

export interface Exception {
  type: ExceptionType
  message: string
  collection: ExceptionCollection
}

export interface ExceptionState {
  exceptions: Exception[]
}

export const useExceptionStore = defineStore('exception', {
  state: (): ExceptionState => ({
    exceptions: [],
  }),
  actions: {
    addException(
      message: string,
      type: ExceptionType = ExceptionType.Error,
      collection: ExceptionCollection = ExceptionCollection.Global
    ) {
      if (this.exceptions.some(error => error.message === message)) return

      this.exceptions.push({ message, type, collection })
    },
    removeException(message: string) {
      this.exceptions = this.exceptions.filter(
        error => error.message !== message
      )
    },
  },
})
