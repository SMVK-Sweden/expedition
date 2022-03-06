## rita upp en karta med svg

Väldigt bra info:

1. https://bost.ocks.org/mike/map/
2. https://www.d3indepth.com/geographic/

Idéen är att man skapar en geojson fil (eller ännu bättre en topojson som är mer kompakt) och att man sedan använder d3 för att skapa en projektion av datan (som är en sfär) på en 2d yta. Jag använder just nu `"geoMercator"` som är samma projektion som google maps. Man kan sedan rita upp denna projektion med svg eller canvas.

## integrera d3 med react

Det var svårt att få d3 att samspela med react då d3 vill manipulera DOM själv. Jag hittade den här länken om hur man kan skapa react-komponenter som använder funktioner från d3 men som själva sköter interaktionen med DOM: https://wattenberger.com/blog/react-and-d3.

Den nuvarande komponenten är nästan helt tagen från hennes exempel.
