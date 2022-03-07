## rita upp en karta med svg

Väldigt bra info:

1. https://bost.ocks.org/mike/map/
2. https://www.d3indepth.com/geographic/

Idéen är att man skapar en geojson fil (eller ännu bättre en topojson som är mer kompakt) och att man sedan använder d3 för att skapa en projektion av datan (som är en sfär) på en 2d yta. Jag använder just nu `"geoEquirectangular"`. Ett alternativ som kanske är bättre är `"geoMercator"` som är samma projektion som google maps, den skulle nog därför passa bättre med leaflet. Man kan sedan rita upp denna projektion med svg eller canvas.

## integrera d3 med react

Det var svårt att få d3 att samspela med react då d3 vill manipulera DOM själv. Jag hittade den här länken om hur man kan skapa react-komponenter som använder funktioner från d3 men som själva sköter interaktionen med DOM: https://wattenberger.com/blog/react-and-d3.

Den nuvarande komponenten är nästan helt tagen från hennes exempel.

## data

Här finns geojson för att måla upp en karta https://www.naturalearthdata.com/downloads/

# eventuella problem

Det kan vara så att den blir långsam på t.ex mobiler. Det är rätt många svg komponenter på en karta. Just nu har jag löst det genom att använda data som inte är jättedetaljerad och det funkar bra på en desktop. Om det blir för långsamt finns möjligheten att använda d3 för att måla på ett `canvas` istället. Men det är rätt nice om det funkar med react för det gör det enkelt att styla och hantera events.

## idéer

man kanske bara skulle rita ut landmasasn utan att ladda in alla länder för det såg väl lite anorlunda ut på 1880-talet. Man skulle då kunna lägga in städer osv som båten besöker manuellt på kartan.

## låta d3 rita kartan

https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102
https://www.jasondavies.com/maps/rotate/
https://www.demo2s.com/javascript/javascript-d3-js-clickable-transparent-3d-world-map-canvas-globe-mouse.html
