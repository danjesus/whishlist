module.exports = {
  database: "whishlist_test",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    logging: false,
    storage: "whishlist_test.sqlite",
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