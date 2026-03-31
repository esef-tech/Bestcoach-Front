import Navbar from './Navbar';

jest.mock(
  'react-router-dom',
  () => ({
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  }),
  { virtual: true },
);

jest.mock('../firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: jest.fn(() => jest.fn()),
  },
  db: {},
  sendEmailVerification: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn((_auth, callback) => {
    callback(null);
    return jest.fn();
  }),
  updatePassword: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(() =>
    Promise.resolve({
      exists: () => false,
      data: () => ({}),
    }),
  ),
  deleteDoc: jest.fn(),
}));

jest.mock('../COMPONENTS/MFA/MFAVerificationModal', () => () => null);
jest.mock('./TOPHEADER/TopHeader', () => () => <div>Top Header</div>);

test('exports a navbar component', () => {
  expect(Navbar).toBeDefined();
});
