# Pegmatite

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor elementum suscipit. Fusce fermentum hendrerit vestibulum. Aliquam placerat ligula tempus efficitur varius. Fusce elementum neque velit. Curabitur fermentum elementum bibendum. Vivamus ac magna a sem venenatis blandit scelerisque pulvinar augue. Vivamus placerat quam ut dolor ullamcorper cursus. Praesent viverra leo eget felis condimentum gravida. Mauris condimentum diam sit amet nisi malesuada, et blandit augue varius. Vivamus dapibus augue consequat mollis congue.


## Sequence diagram

```uml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```

## Sequence diagram

```uml
@startuml

[*] --> State1
State1 --> [*]
State1 : this is a string
State1 : this is another string

State1 -> State2
State2 --> [*]

@enduml
```