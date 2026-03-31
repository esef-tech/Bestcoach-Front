import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }) => children,
    Routes: ({ children }) => children,
    Route: ({ element }) => element,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  }),
  { virtual: true },
);

jest.mock('./COMPONENTS/AnalyticsTracker', () => () => <div>Analytics Tracker</div>);
jest.mock('./COMPONENTS/Seo', () => () => null);
jest.mock('./COMPONENTS/Navbar', () => () => <div>Navbar</div>);
jest.mock('./COMPONENTS/FOOTER/Footer', () => () => <div>Footer</div>);
jest.mock('./COMPONENTS/AIAgent', () => () => null);
jest.mock('./COMPONENTS/PAGES/HOME/Home', () => () => <div>Home Page</div>);
jest.mock('./COMPONENTS/PAGES/PACKAGES/Package', () => () => <div>Package Page</div>);
jest.mock('./COMPONENTS/PAGES/QUICK-LINKS/Links', () => () => <div>Links Page</div>);
jest.mock('./COMPONENTS/PAGES/NEWS/News', () => () => <div>News Page</div>);
jest.mock('./COMPONENTS/PAGES/TEAMS/Teams', () => () => <div>Teams Page</div>);
jest.mock('./COMPONENTS/PAGES/SERVICES/Church-Services', () => () => <div>Church Services</div>);
jest.mock('./COMPONENTS/PAGES/SERVICES/School-Service', () => () => <div>School Services</div>);
jest.mock('./COMPONENTS/PAGES/SERVICES/Individual-Services', () => () => <div>Individual Services</div>);
jest.mock('./COMPONENTS/PAGES/SERVICES/Group-Services', () => () => <div>Group Services</div>);
jest.mock('./COMPONENTS/PAGES/ABOUT/About', () => () => <div>About Page</div>);
jest.mock('./COMPONENTS/PAGES/CONTACT/Contact', () => () => <div>Contact Page</div>);
jest.mock('./COMPONENTS/PAGES/CAREERS/Careers', () => () => <div>Careers Page</div>);
jest.mock('./COMPONENTS/PAGES/BLOG/Blog', () => () => <div>Blog Page</div>);
jest.mock('./COMPONENTS/PAGES/EVENTS/TSS', () => () => <div>TSS Page</div>);
jest.mock('./COMPONENTS/PAGES/EVENTS/TMME', () => () => <div>TMME Page</div>);
jest.mock('./COMPONENTS/PAGES/PRESS/Press', () => () => <div>Press Page</div>);
jest.mock('./COMPONENTS/PAGES/HELP/Help', () => () => <div>Help Page</div>);
jest.mock('./COMPONENTS/PAGES/HELP/helpPages/TeacherSupport', () => () => <div>Teacher Support</div>);
jest.mock('./COMPONENTS/PAGES/HELP/helpPages/StuedentSupport', () => () => <div>Student Support</div>);
jest.mock('./COMPONENTS/PAGES/HELP/helpPages/Parents', () => () => <div>Parent Support</div>);
jest.mock('./COMPONENTS/PAGES/WEBINARS/Webinar', () => () => <div>Webinars Page</div>);
jest.mock('./COMPONENTS/PAGES/FAQS/Faq', () => () => <div>FAQ Page</div>);
jest.mock('./COMPONENTS/PAGES/STUDIO/StudioTutorials', () => () => <div>Studio Tutorials</div>);
jest.mock('./COMPONENTS/PAGES/METHOD/Method', () => () => <div>Method Page</div>);
jest.mock('./COMPONENTS/PAGES/COACHES/Coaches', () => () => <div>Coaches Page</div>);
jest.mock('./COMPONENTS/PAGES/LOYAL/Loyal', () => () => <div>Loyal Page</div>);
jest.mock('./COMPONENTS/PAGES/SHOP/Shop', () => () => <div>Shop Page</div>);
jest.mock('./COMPONENTS/PAGES/COMMUNITY/Community', () => () => <div>Community Page</div>);
jest.mock('./COMPONENTS/Profile', () => () => <div>Profile Page</div>);
jest.mock('./context/SessionContext', () => ({
  SessionProvider: ({ children }) => children,
}));
jest.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
}));
jest.mock('./context/ThemeContext', () => ({
  ThemeProvider: ({ children }) => children,
}));

test('renders app shell', () => {
  render(<App />);
  expect(screen.getByText('Navbar')).toBeInTheDocument();
  expect(screen.getByText('Home Page')).toBeInTheDocument();
  expect(screen.getByText('Footer')).toBeInTheDocument();
});
