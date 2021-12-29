import { sleep } from 'k6';
import { login, getPage } from './settings/requests.js'
import options from './settings/options.js'

export { options }

// VU code
export default function () {
  login()
  sleep(5)
  getPage()
}

