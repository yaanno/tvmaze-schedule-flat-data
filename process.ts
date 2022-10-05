import { readJSON, writeJSON } from "https://deno.land/x/flat@0.0.14/mod.ts"
import Schedule from "./types.ts"

// the github action will use this
const fileName = Deno.args[0]

// only for testing
// const fileName = "tvmaze-schedule.json"
const schedules: Schedule.Item[] = await readJSON(fileName)

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
  const country = {
    name: network?.country?.name || webChannel?.country?.name,
    code: network?.country?.code || webChannel?.country?.code,
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
      country,
    },
  }
})

// write main schedule file
const writeFileName = "tvmaze-schedule-processed.json"
await writeJSON(writeFileName, processed)

// let's try something different, say episodes by genre
// we'll use the processed data
// it is basically a catalog for a db call
// like when you would `await getByGenre(genre: Genre): ItemId[] {}`

const itemsByGenre = new Map()
const NO_GENRE = "Uncategorized"

// let's be very explicit (and slow...) here... :)
processed.forEach((item) => {
  const genres = item.show.genres

  if (genres.length) {
    genres.forEach((genre) => {
      const val = itemsByGenre.get(genre)
      if (!val) {
        itemsByGenre.set(genre, [item.id])
      } else {
        val.push(item.id)
        itemsByGenre.set(genre, val)
      }
    })
  } else {
    const val = itemsByGenre.get(NO_GENRE)
    if (!val) {
      itemsByGenre.set(NO_GENRE, [item.id])
    } else {
      val.push(item.id)
      itemsByGenre.set(NO_GENRE, val)
    }
  }
})

const genreFileName = "tvmaze-schedule-genres-processed.json"
await writeJSON(genreFileName, Object.fromEntries(itemsByGenre))
