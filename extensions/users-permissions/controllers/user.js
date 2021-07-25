module.exports = {
  getDriverByIdNumber: async (ctx) => {
    try {
      const { _idNumber } = ctx.query;

      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ idNumber: _idNumber });
      return user;
    } catch (error) {
      console.log("Could not find user: ", error.message);
    }
  },
};
