"use strict";

module.exports = {
  query: `
    getDriverByIdNumber(idNumber: String!): UsersPermissionsUser
  `,
  resolver: {
    Query: {
      getDriverByIdNumber: {
        policies: ["plugins::users-permissions.isAuthenticated"],
        resolver: "plugins::users-permissions.user.getDriverByIdNumber",
      },
    },
  },
};
