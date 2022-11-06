import {
  createTuit,
  deleteTuit,
  findAllTuits,
  findTuitById,
  findTuitByUser
} from "../services/tuits-service";

import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API, createTuit', () => {
  const testTuit = {
    tuit: 'Hey I am a test tuit',
    postedBy: '6355b899964d226fbf632852'
  }
  let tid;
  let newTuit;
  beforeAll(async () => {
    newTuit = await createTuit(testTuit.postedBy, testTuit);
  })


  afterAll(() =>
  {
    return deleteTuit(tid);
  });

  test('can create tuit with REST API', async () => {
    tid = newTuit._id;
    expect(newTuit.tuit).toEqual(testTuit.tuit);
    expect(newTuit.postedBy).toEqual(testTuit.postedBy);

  })
});


describe('can delete tuit with REST API', () => {
  const testTuit = {
    tuit: 'Hey I am a test tuit to be deleted',
    postedBy: '6355b899964d226fbf632852'
  }
  let tid;
  let newTuit;
  beforeAll(async () => {
    newTuit = await createTuit(testTuit.postedBy, testTuit);
  })


  afterAll(() =>
  {
    return deleteTuit(tid);
  });

  test('can delete tuit with REST API', async () => {
    tid = newTuit._id;
    const deleteCounts = await deleteTuit(tid);
    expect(deleteCounts.deletedCount).toBeGreaterThanOrEqual(1);

  })
});

describe('can find tuit with primary key using REST API', () => {
  const testTuit = {
    tuit: 'Hey I am a test tuit to be fetched',
    postedBy: '6355b899964d226fbf632852'
  }
  let tid;
  let newTuit;
  let currPostedBy;
  beforeAll(async () => {
    newTuit = await createTuit(testTuit.postedBy, testTuit);
  })


  afterAll(() =>
  {
    return deleteTuit(tid);
  });

  test('can fetch tuit with REST API', async () => {
    tid = newTuit._id;

    expect(newTuit.tuit).toEqual(testTuit.tuit);
    expect(newTuit.postedBy).toEqual(testTuit.postedBy);
    const currTuit = await findTuitById(tid);
    currPostedBy = currTuit.postedBy._id
    expect(currTuit.tuit).toEqual(testTuit.tuit);
    expect(currPostedBy).toEqual(newTuit.postedBy);

  })
});

describe('can retrieve all tuits with REST API', () => {

  let testTuits = [{
    tuit: 'This is a test tuit1',
    postedBy: '6355b899964d226fbf632852'
  }, {
    tuit: 'This is test tuit2',
    postedBy: '6355b899964d226fbf632852'
  }, {
    tuit: 'This is test tuit3',
    postedBy: '6355b899964d226fbf632852'
  }]
  beforeAll(async () => {
    return Promise.all(
      testTuits.map(
        eachTuit =>
          createTuit(eachTuit.postedBy, eachTuit)));
  });
  let postedBy = '6355b899964d226fbf632852';
  afterAll(async () => {
    const tuitsInserted = await findTuitByUser(postedBy);
    return Promise.all(tuitsInserted.map(tuit => deleteTuit(tuit._id)));
  });

  test('can retrieve all tuits with REST API', async () => {
    const allTuitsFetched = await findAllTuits();
    expect(allTuitsFetched.length).toBeGreaterThanOrEqual(3);
    const tuitsWeInserted = allTuitsFetched.filter(
    tuit => testTuits.indexOf(tuit.tuit) >= 0);
    tuitsWeInserted.forEach(tuit => {
    const tuitname = tuitsInserted.find(tuitname => tuitname === tuit.tuit);
    expect(tuit.tuit).toEqual(tuit);

  })
});
});
