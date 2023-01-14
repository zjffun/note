---
date: 'Tue, 10 Jan 2023 15:45:45 GMT'
updated: 'Tue, 10 Jan 2023 15:45:45 GMT'
---

# [Create the user administrator](https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/#create-the-user-administrator)

```sh
mongosh
```

```mongodb
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: passwordPrompt(), // or cleartext password
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
```

# [Enable access control](https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/#re-start-the-mongodb-instance-with-access-control)

```sh
sudo vim /etc/mongod.conf
```

[IP Binding](https://www.mongodb.com/docs/manual/core/security-mongodb-configuration/#ip-binding)

```text
net:
  port: 27017
  bindIp: 0.0.0.0

security:
    authorization: enabled
```

```sh
sudo service mongod restart

mongosh --port 27017 --authenticationDatabase "admin" -u "myUserAdmin" -p
```

# [Create user](https://www.mongodb.com/docs/manual/tutorial/create-users/#create-additional-users-for-your-deployment)

```mongodb
use test
db.createUser(
  {
    user: "myTester",
    pwd:  passwordPrompt(),   // or cleartext password
    roles: [ { role: "readWrite", db: "test" } ]
  }
)
```
