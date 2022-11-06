import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";

describe('createUser', () => {
  // sample user to insert
  const ripley1 = {
    username: 'ellenripley1',
    password: 'lv4261',
    email: 'ellenriple1y@aliens.com'
  };

  // setup test before running test
  beforeAll(() => {
    // remove any/all users to make sure we create it in the test
    return deleteUsersByUsername(ripley1.username);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(ripley1.username);
  })

  test('can insert new users with REST API', async () => {
    // insert new user in the database
    const newUser = await createUser(ripley1);

    // verify inserted user's properties match parameter user
    expect(newUser.username).toEqual(ripley1.username);
    expect(newUser.password).toEqual(ripley1.password);
    expect(newUser.email).toEqual(ripley1.email);
  });
});

describe('deleteUsersByUsername', () => {
let test_delete_user;
  // sample user to delete
  const sowell1 = {
    username: 'thommas_sowell1',
    password: 'compromise1',
    email: 'compromise@solutions.com1'
  };

  // setup the tests before verification
  // beforeAll(async () => {
  //   test_delete_user = await createUser(sowell1);
  //   console.log(test_delete_user);
  //   // insert the sample user we then try to remove
  //   // return createUser(sowell1);
  // });

  // clean up after test runs
  // afterAll(() => {
  //   // remove any data we created
  //   return deleteUsersByUsername(sowell1.username);
  // })

  test('can delete users from REST API by username', async () => {
    test_delete_user = await createUser(sowell1);
    console.log(test_delete_user);
    // delete a user by their username. Assumes user already exists
    const status = await deleteUsersByUsername(sowell1.username);
console.log(status);
    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('findUserById',  () => {
  // sample user we want to retrieve
  const adam1 = {
    username: 'adam1_smith',
    password: 'not0sum',
    email: 'wealth@nations.com'
  };

  // setup before running test
  // beforeAll(() => {
  //   // clean up before the test making sure the user doesn't already exist
  //   return deleteUsersByUsername(adam1.username)
  // });

  // clean up after ourselves
  afterAll(() => {
    // remove any data we inserted
    return deleteUsersByUsername(adam1.username);
  });

  test('can retrieve user from REST API by primary key', async () => {
    // insert the user in the database
    const newUser = await createUser(adam1);

    // verify new user matches the parameter user
    expect(newUser.username).toEqual(adam1.username);
    expect(newUser.password).toEqual(adam1.password);
    expect(newUser.email).toEqual(adam1.email);

    // retrieve the user from the database by its primary key
    const existingUser = await findUserById(newUser._id);

    // verify retrieved user matches parameter user
    expect(existingUser.username).toEqual(adam1.username);
    expect(existingUser.password).toEqual(adam1.password);
    expect(existingUser.email).toEqual(adam1.email);
  });
});


describe('findAllUsers',  () => {

  // sample users we'll insert to then retrieve
  const usernames = [
    "larry", "curley", "moe"
  ];

  // setup data before test
  beforeAll(() =>
    // insert several known users
    usernames.map(username =>
      createUser({
        username,
        password: `${username}123`,
        email: `${username}@stooges.com`
      })
    )
  );

  // clean up after ourselves
  afterAll(() =>
    // delete the users we inserted
    usernames.map(username =>
      deleteUsersByUsername(username)
    )
  );

  test('can retrieve all users from REST API', async () => {
    // retrieve all the users
    const users = await findAllUsers();
    // console.log(users);
    // there should be a minimum number of users
    expect(users.length).toBeGreaterThanOrEqual(usernames.length);

    // let's check each user we inserted
    const usersWeInserted = users.filter(
      user => usernames.indexOf(user.username) >= 0);

    // compare the actual users in database with the ones we sent
    usersWeInserted.forEach(user => {
      const username = usernames.find(username => username === user.username);
      expect(user.username).toEqual(username);
      expect(user.password).toEqual(`${username}123`);
      expect(user.email).toEqual(`${username}@stooges.com`);
    });
  });
});
