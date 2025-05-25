# Graphql

This task is a part of the [RSSchool Node.js Course](https://rs.school/courses/nodejs) 2025.

[Task description](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md)

### Installation

clone this repo
switch to the dev branch
run `npm ci` to install dependencies
create `.env` file in the root directory (copy from .env.example)

### Scripts

Tests

- `test-integrity`
- `test-queries`
- `test-mutations`
- `test-rule`
- `test-loader`
- `test-loader-prime`

Other

- `start` - start server

### Useful things:

- Database GUI: npx prisma studio
- Reset database: npx prisma migrate reset (includes seeding)
- Test REST API (Swagger): [::1]:8000/docs
- Use a GraphQL [client](https://learning.postman.com/docs/sending-requests/graphql/graphql-overview/) with [introspection](https://graphql.org/learn/introspection/) support for testing.
