"use strict";

module.exports = {
  mutation: `
  createDriverFine(input: createFineInput!): Fines
  `,
  resolver: {
    Mutation: {
      createDriverFine: {
        policies: ["plugins::users-permissions.isAuthenticated"],
        resolver: "application::fines.fines.createDriverFine",
      },
    },
  },
};
