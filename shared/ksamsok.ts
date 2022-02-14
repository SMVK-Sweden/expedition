const apiUrl = 'https://kulturarvsdata.se/ksamsok/api?method=search'

export async function ksamsokSearch(query: string, metadata: string) {
  const searchUrl = `${apiUrl}&${metadata}&query=text=${encodeURIComponent(
    query
  )}`

  const response = await fetch(searchUrl, {
    headers: {
      Accept: 'application/json-ld',
    },
  })

  const json = await response.json()
  return json.result
}

export async function vanadisImages() {
  const res = await ksamsokSearch('vanadis AND thumbnailExists=j', '')
  const graphs = res.records.map((record) => record.record['@graph'])

  const processedRecords = graphs.map((g) => {
    const source =
      g.find(
        (node) => node['@type'] == 'Image' || node['@type'] == 'ns1:Image' // sometimes, the nodenames has the prefix ns1:
      ).lowresSource || ''

    const descriptions = g.filter(
      (node) =>
        node['@type'] == 'ItemDescription' ||
        node['@type'] == 'ns1:ItemDescription'
    )

    const possibleDescription = descriptions.find(
      (node) => node.type['@value'] == 'Beskrivning'
    )

    const description = possibleDescription
      ? possibleDescription.desc['@value']
      : 'beskrivning saknas'

    return { source: source, description: description }
  })

  return processedRecords
}
