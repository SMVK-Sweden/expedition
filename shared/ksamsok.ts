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

export async function imageWithDescriptionMany(query: string) {
  const res = await ksamsokSearch(query, '')
  const graphs = res.records.map((record: any) => record.record['@graph'])

  const processedRecords = graphs.map((g: any) => {
    const possibleSource = g.find(
      (node: any) => node['@type'] == 'Image' || node['@type'] == 'ns1:Image' // sometimes, the nodenames has the prefix ns1:
    )

    const source = possibleSource ? possibleSource.lowresSource : ''

    const descriptions = g.filter(
      (node: any) =>
        node['@type'] == 'ItemDescription' ||
        node['@type'] == 'ns1:ItemDescription'
    )

    const possibleDescription = descriptions.find(
      (node: any) => node.type['@value'] == 'Beskrivning'
    )

    const description = possibleDescription
      ? possibleDescription.desc['@value']
      : 'beskrivning saknas'

    return { source: source, description: description }
  })

  return processedRecords
}
