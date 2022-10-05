import { readJSON, writeJSON } from "https://deno.land/x/flat@0.0.14/mod.ts"
import Schedule from "./types.ts"

// the github action will use this
const fileName = Deno.args[0]

// only for testing
// const fileName = "data.json"
const schedules: Schedule.Item[] = await readJSON(fileName)

/**
 * The data we are interested in:
 * Episode
 * Show
 */

/**
 * Episode
 * id, url, name, season, number, airdate, airtime, airstamp
 */

/**
 * Show
 * id, url, name, language, genres, premiered, schedule, rating, network, webChannel, image, summary
 */

const processed = schedules.map((item) => {
  const episodeId = item.id
  const episodeUrl = item.url
  const episodeName = item.name
  const { season, number, airdate, airstamp, _embedded } = item
  const { show } = _embedded
  const {
    id,
    url,
    name,
    language,
    genres,
    premiered,
    rating,
    network,
    webChannel,
    image,
    summary,
  } = show
  const channel = {
    name: network?.name || webChannel?.name,
    id: network?.id || webChannel?.id,
    url: network?.officialSite || webChannel?.officialSite,
  }
  return {
    id: episodeId,
    url: episodeUrl,
    name: episodeName,
    season,
    number,
    airdate,
    airstamp,
    show: {
      id,
      url,
      name,
      language,
      genres,
      premiered,
      rating: rating.average,
      channel,
      image,
      summary,
    },
  }
})

const writeFileName = "processed.json"
await writeJSON(writeFileName, processed)
