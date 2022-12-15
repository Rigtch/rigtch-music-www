import { defineStore } from 'pinia'

export enum ExceptionType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export interface Exception {
  type: ExceptionType
  message: string
}

export interface ExceptionState {
  exceptions: Exception[]
}

export const useExceptionStore = defineStore('exception', {
  state: (): ExceptionState => ({
    exceptions: [],
  }),
  actions: {
    addError(message: string, type: ExceptionType = ExceptionType.Error) {
      this.exceptions.push({ message, type })
    },
    removeError(message: string) {
      this.exceptions = this.exceptions.filter(
        error => error.message !== message
      )
    },
  },
})
