const apiUrl = 'https://kulturarvsdata.se/ksamsok/api?method=search'

/*
egentligen borde man använda ksamsöks metoder för att söka på saker som är relaterade till resans id
den har denna url

const relationsUrl =
  'https://kulturarvsdata.se/ksamsok/api?method=getRelations&relation=all&objectId=LSH/events/3554'

Just nu söker vi bara på texten 'vanadis'
*/

export async function ksamsokSearch(query: string, metadata: string) {
  const searchUrl = `${apiUrl}&${metadata}&query=text=${encodeURIComponent(
    `vanadis ${query} AND thumbnailExists="j"`
  )}`

  const response = await fetch(searchUrl, {
    headers: {
      Accept: 'application/json-ld',
    },
  })

  const json = await response.json()
  return json.result
}

export async function getImagesWithDescription(query: string) {
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

    return { src: source, description: description }
  })

  return processedRecords
}
