import {userTogglesTuitLikes} from "../services/likes-service";
import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";
import {
  findTuitById,
  createTuitByUser
} from "../services/tuits-service";

describe('user toggles likes button', () => {

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

  test('user can like and remove dislike for a tuit', async () => {
    const testTuit = 'This is a test';
    const newTuit = await createUser(ellen);
    const testing = await createTuitByUser(newTuit._id, testTuit);
    const like = await findTuitById(testing._id);
    await userTogglesTuitLikes(newTuit._id, testing._id);

    expect(like.stats.likes).toEqual(0);

    await userTogglesTuitLikes(newTuit._id, testing._id);

  });
});
