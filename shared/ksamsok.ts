import * as jsonld from 'jsonld'

export async function ksamsok(search: string) {
  const query = encodeURIComponent(`"${search}" and thumbnailExists=j`)
  const searchUrl = `https://kulturarvsdata.se/ksamsok/api?method=search&hitsPerPage=100&recordSchema=presentation&query=${query}`

  const response = await fetch(searchUrl, {
    headers: {
      Accept: 'application/json-ld',
    },
  })

  const json = await response.json()
  return json
}

export async function ksamsokSearch(query: string, metadata: string) {
  const queryStr = encodeURIComponent(query)
  const searchUrl = `https://kulturarvsdata.se/ksamsok/api?method=search&${metadata}&query=${queryStr}`

  const response = await fetch(searchUrl, {
    headers: {
      Accept: 'application/json-ld',
    },
  })

  const json = await response.json()
  return json.result
}

/*
 * query is a cql query
 * fiels is a comma separated list of the fields to include
 */
interface KeyVal {
  name: string
  content: any
}

export async function ksamsokJson(query: string, fields: string) {
  const res = await ksamsokSearch(
    `${query}`,
    `recordSchema=xml&fields=${fields}`
  )

  const records = res.records.record.map((record) => record.field)
  const recordObjects = records.map((record) => {
    const obj = {}
    record.forEach(({ name, content }: KeyVal) => {
      if (obj[name]) {
        if (!Array.isArray(obj[name])) obj[name] = [obj[name]]
        obj[name].push(content)
      } else {
        obj[name] = content
      }
    })
    return obj
  })

  return recordObjects
}
