const User = app.db.models.User;
const Whishlist = app.db.models.Whishlist;

export function emptyUsers() {
  return User.destroy({
    where: {},
  });
}

export function emptyWhishlists() {
  return Whishlist.destroy({
    where: {},
  });
}

export function createUser() {
  return User.create({
    name: 'No Body',
    email: 'nobody@gmail.com',
    password: '123456',
  });
}

export function createWhishlist(callback) {
  createUser().then(user => {
    emptyWhishlists().then(() => {
      Whishlist.bulkCreate([{
        id: 1,
        description: 'Macbook pro 15',
        user_id: user.id,
        name: 'Macbook pro',
        average_value: 5000.00,
      }, {
        id: 2,
        description: 'Apple thunderbolt display',
        user_id: user.id,
        name: 'Apple thunderbolt',
        average_value: 7000.00,
      },
      ]).then(whishes => {
        callback(whishes, user);
      });
    });
  });
}
