import { DataX } from "./DataX"

export const info = (namespace, message, ...args) => console.info(`【${namespace}】${message}`, ...args)

export const warn = (namespace, message, ...args) => console.warn(`【${namespace}】${message}`, ...args)

export const error = (namespace, message, ...args) => console.error(`【${namespace}】${message}`, ...args)

export const debug = (namespace, ...args) => DataX.globals.config.debug ? console.debug(`【${namespace}】`, ...args) : null

export const throwError = (namespace, message) => new Error(`【${namespace}】${message}`)
