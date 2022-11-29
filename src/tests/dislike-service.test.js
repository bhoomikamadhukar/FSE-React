import {userTogglesTuitDislikes} from "../services/dislikes-service";
import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";
import {
  findTuitById,
  createTuitByUser
} from "../services/tuits-service";

describe('user toggles dislikes button', () => {

  const ellen = {
    username: 'ellen_ripley',
    password: 'lv426',
    email: 'repley@weyland.com'
  };


  beforeAll(() => {
    return deleteUsersByUsername(ellen.username);
  })

  afterAll(() => {

    return deleteUsersByUsername(ellen.username);
  })

  test('user can dislike and remove dislike for a tuit', async () => {
    const testTuit = 'This is a test';
    const newTuit = await createUser(ellen);
    const testing = await createTuitByUser(newTuit._id, testTuit);
    const dislike = await findTuitById(testing._id);
    await userTogglesTuitDislikes(newTuit._id, testing._id);

    expect(dislike.stats.dislikes).toEqual(0);

    await userTogglesTuitDislikes(newTuit._id, testing._id);

  });
});
