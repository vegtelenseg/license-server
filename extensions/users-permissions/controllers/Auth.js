const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  // async emailConfirmation(ctx, next, returnUser = true) {
  //   console.log("No ways");
  //   const params = ctx.query;
  //   let user = await strapi.query("user", "users-permissions").findOne({
  //     email: params.identifier,
  //   });
  //   if (!user) {
  //     return ctx.badRequest(
  //       null,
  //       formatError({
  //         id: "Auth.form.error.code.provide",
  //         message: "Incorrect code provided.",
  //       })
  //     );
  //   }
  //   if (user.confirmed) {
  //     return ctx.badRequest("already.confirmed");
  //   }
  //   if (user.blocked) {
  //     return ctx.badRequest("blocked.user");
  //   }
  //   user = await strapi
  //     .query("user", "users-permissions")
  //     .update({ id: user.id }, { confirmed: true, confirmEmailOtp: null });
  //   if (returnUser) {
  //     ctx.send({
  //       jwt: strapi.plugins["users-permissions"].services.jwt.issue({
  //         id: user.id,
  //       }),
  //       user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
  //         model: strapi.query("user", "users-permissions").model,
  //       }),
  //     });
  //   } else {
  //     const settings = await strapi
  //       .store({
  //         environment: "",
  //         type: "plugin",
  //         name: "users-permissions",
  //         key: "advanced",
  //       })
  //       .get();
  //     ctx.redirect(settings.email_confirmation_redirection || "/");
  //   }
  // },
};
