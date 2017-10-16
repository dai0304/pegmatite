# Pegmatite - Chrome ext to preview PlantUML in markdown

This is minor improve of Pegmatite. It is Google Chrome extension that replace PlantUML code blocks into preview images.
[Original Project](https://github.com/dai0304/pegmatite)

After install This extension you can view plantuml text as a image.

### Any Html Page at Any Site
You can use `<div puml> @startuml .... @enduml</div>`
or `<pre uml> @startuml .... @enduml</pre>`
then you can see PlantUML image instead of PlantUML code

### typedoc example
```typescript
/**
 * This is class documentation comment
 *
 * class diagram for this class
 * <pre uml>
 *   @startuml
 *   Object <|-- ArrayList
 *
 *   Object : equals()
 *   ArrayList : Object[] elementData
 *   ArrayList : size()
 *   @enduml
 * </pre>
 *
 */
export class GraphWidget extends EventEmitter implements IGraphWidget {
...
```

after generate type doc then open generated document on chrome then you can see PlantUML image!

