module.exports = {
  database: "whishlist_test",
  username: "danjesus",
  password: "",
  params: {
    dialect: "postgres",
    logging: false,
    sync: {
      force: true
    },
    define: {
      underscored: true
    }
  },
  secret: "()*()()*dsdasd987)",
  jwtSession: {session: false},
  port: 3000
};