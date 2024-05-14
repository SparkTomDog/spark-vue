import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faFile, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faMagnifyingGlass, faFile)

export {
    FontAwesomeIcon
}