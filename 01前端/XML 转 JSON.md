# xml -> json

-   attribute -> underscore + key
-   tag -> key
-   content -> value

例如：

```xml
<messages>
  <note id="501">
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
  </note>
  <note id="502">
    <to>Jani</to>
    <from>Tove</from>
    <heading>Re: Reminder</heading>
    <body>I will not</body>
  </note>
</messages>
```

```json
{
  "messages": {
    "note": [
      {
        "to": "Tove",
        "from": "Jani",
        "heading": "Reminder",
        "body": "Don't forget me this weekend!",
        "_id": "501"
      },
      {
        "to": "Jani",
        "from": "Tove",
        "heading": "Re: Reminder",
        "body": "I will not",
        "_id": "502"
      }
    ]
  }
}
```
