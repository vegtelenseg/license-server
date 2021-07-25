"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createDriverFine: async (ctx) => {
    try {
      const {
        reason,
        amount,
        officer: officerId,
        driver: driverId,
      } = ctx.request.body;
      const driver = await strapi
        .query("user", "users-permissions")
        .findOne({ id: driverId });
      if (!driver) {
        ctx.throw(5000, "Could not find driver: ");
      }
      const officer = await strapi
        .query("user", "users-permissions")
        .findOne({ email: officerId });
      if (!officer) {
        ctx.throw(5000, "Could not find officer: ");
      }
      await strapi.query("fines").create({
        amount,
        reason,
        officer,
        driver,
        dueDate: "2020-10-10",
      });
    } catch (error) {
      console.log("Could not create Fine");
    }
  },
};
