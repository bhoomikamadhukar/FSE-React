import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
//
jest.mock('axios');
//
const MOCKED_USERS = [
  {username: 'dummy', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'dummy2', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

const MOCKED_TUITS = [
  {tuit:'This is a test tuit',postedBy:'dummy',_id:123},
    {tuit:'This is also a test tuit',postedBy:'sarah_conor',_id:234}
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>
  );

  const linkElement = screen.getByText(/This is a test tuit/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/This is also a test tuit/i);
  expect(linkElement2).toBeInTheDocument();
});

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);

  const tuit = screen.getByText(/This is also a test tuit/i);
  expect(tuit).toBeInTheDocument();
});
