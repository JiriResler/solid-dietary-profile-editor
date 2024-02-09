import {
    getPodUrlAll
 } from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { Session } from "@inrupt/solid-client-authn-browser";


async function getPodUrl(currentSession: Session) {
    if (currentSession.info.webId === undefined) {
        return
    }

    const userWebID: string = currentSession.info.webId

    const podUrls = await getPodUrlAll(userWebID, {
      fetch: fetch as undefined,
    }).catch((error: Error) => console.log(error.message))

    if (podUrls === undefined) {
      throw new Error('Array with pod URLs is undefined')
    }

    const firstPodUrl = podUrls[0]

    return firstPodUrl
  }

export default getPodUrl
