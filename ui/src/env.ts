/**
 * The single place where we read in the ENV and then
 * re-export it to the app.
 *
 * https://github.com/vitejs/vite/issues/1955#issuecomment-1029853795
 */
const nodeEnv = import.meta.env?.MODE || ''
const apiUrl = import.meta.env?.VITE_API_URL || ''

export const env = {
  nodeEnv,
  apiUrl
}
