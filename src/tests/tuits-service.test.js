import {
  findAllTuits,
  findAllTuitsByUser,
  findTuitById,
  createTuitByUser,
  updateTuit,
  deleteTuit
} from "../services/tuits-service";
import {
  createUser,
  deleteUsersByUsername, findAllUsers, findUserById
} from "../services/users-service";

describe('create a tuit by a valid user', () => {
  const ellen = {
      username: 'ellen_ripley',
      password: 'lv426',
      email: 'repley@weyland.com'
  };
const testTuit = 'This is a test';
  beforeAll(() => {
      return deleteUsersByUsername(ellen.username);
  })

  afterAll(() => {
      return deleteUsersByUsername(ellen.username);
  })

  test('can create tuit with REST API', async () => {
      const test_user = await createUser(ellen);


      const newTuit = await createTuitByUser(test_user._id, testTuit);
      expect(newTuit.tuit).toEqual('This is a test');
      expect(newTuit.postedBy).toEqual(test_user._id);

      await deleteTuit(newTuit._id);
  })
});

describe('find a tuit by using ID', () => {
  const ellen = {
      username: 'ellen_ripley',
      password: 'lv426',
      email: 'repley@weyland.com'
  };
const testTuit = 'This is a test';
  beforeAll(() => {
      return deleteUsersByUsername(ellen.username);
  })

  afterAll(() => {
      return deleteUsersByUsername(ellen.username);
  })

  test('can get a tuit by ID with REST API', async () => {
      const test_user = await createUser(ellen);

      let currPostedBy;

      const newTuit = await createTuitByUser(test_user._id, testTuit);
      expect(newTuit.tuit).toEqual('This is a test');
      expect(newTuit.postedBy).toEqual(test_user._id);
      const tid = newTuit._id
      const currTuit = await findTuitById(tid);
      currPostedBy = currTuit.postedBy._id
      expect(currTuit.tuit).toEqual(newTuit.tuit);
      expect(currPostedBy).toEqual(newTuit.postedBy);
      await deleteTuit(newTuit._id);
  })
});


describe('find all tuits', () => {
  const ellen = {
      username: 'ellen',
      password: 'testing123',
      email: 'test@robot.com'
  };
  const testTuits = [
      'test1', 'test2', 'test3'
  ];

  beforeAll(async () => {
      await deleteUsersByUsername(ellen.username);
  })

  afterAll(async () => {
      await deleteUsersByUsername(ellen.username);
  })

  test('can retrieve all tuits with REST API', async () => {
      const test_user = await createUser(ellen);

      testTuits.map(async test => {
          const newTuit = await createTuitByUser(test_user._id, test);
          expect(newTuit.tuit).toEqual(test);
          expect(newTuit.postedBy).toEqual(test_user._id);
      });

      const fetchAll = await findAllTuits();
      expect(fetchAll.length).toBeGreaterThanOrEqual(testTuits.length);

      const insertTuit = fetchAll.filter(
          tuit => testTuits.indexOf(tuit.tuit) >= 0);


      insertTuit.forEach(tuit => {
          const testTuit = testTuits.find(test => test === tuit.tuit);
          expect(tuit.tuit).toEqual(testTuit);

      });


      insertTuit.map(async tuit => {
          await deleteTuit(tuit._id);
      })
  });
});

describe('delete a tuit', () => {
  const ellen = {
      username: 'ellen',
      password: 'testing123',
      email: 'test@robot.com'
  };
  const testTuit = 'This is a test';

  beforeAll(async () => {
      await deleteUsersByUsername(ellen.username);
  })

  afterAll(async () => {
      await deleteUsersByUsername(ellen.username);
  })

  test('can delete tuit with REST API', async () => {
      const newTuit = await createUser(ellen);
      const createdTuit = await createTuitByUser(newTuit._id, testTuit);

      const del = await deleteTuit(createdTuit._id);

      expect(del.deletedCount).toBeGreaterThanOrEqual(1);
  })
});
