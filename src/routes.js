import { Navigate, useRoutes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AllGuns from './pages/AllGuns';
import AllGunsUser from './pages/AllGunsUser';
import AllGunsAdmin from './pages/AllGunsAdmin';
import LogOut from './components/LogOut';
import AddGun from './pages/AddGun'
import GunsDataGrid from './pages/GunsDataGrid'
import UserDataGrid from './pages/UserDataGrid';
import Reservation from './pages/Reservation';
import SettingsUser from './pages/SettingsUser';
import MakeReservation from './pages/MakeReservation';
import ChooseGun from './pages/ChooseGun';
import MyReservation from './pages/MyReservation';
import SettingsAdmin from './pages/SettingsAdmin';
import AddAmmo from './pages/AddAmmo';
import AmmoDataGrid from './pages/AmmoDataGrid';
import AllAmmo from './pages/AllAmmo';

export default function Router() {
  return useRoutes([
    {
      path: 'logowanie',
      element: <SignIn />,
    },
    {
      path: 'rejestracja',
      element: <SignUp />,
    },
    {
      path: 'wylogowanie',
      element: <LogOut />,
    },
    { path: '/',
      element: <AllGuns />
    },
    { path: '/amunicja',
    element: <AllAmmo />
  },
    { path: '/klient/wszystkie-bronie', element: <AllGunsUser /> },
    { path: '/klient/rezerwacja', element: <ChooseGun/>},
    { path: '/klient/rezerwacja/bron/:id', element: <MakeReservation/>},
    { path: '/klient/ustawienia', element:<SettingsUser/>},
    { path: '/klient/zamowienia', element:<MyReservation/>},

    //admin
    { path: '/admin/wszystkie-bronie', element: <AllGunsAdmin /> },
    { path: '/admin/dodawanie-broni', element: <AddGun /> },
    { path: '/admin/bronie', element: <GunsDataGrid /> },
    { path: '/admin/amunicje', element: <AmmoDataGrid /> },
    { path: '/admin/dodawanie-amunicji', element: <AddAmmo/> },
    { path: '/admin/wszystkie-rezerwacje', element: <Reservation/>},
    { path: '/admin/uzytkownicy', element: <UserDataGrid/> },
    { path: '/admin/ustawienia', element:<SettingsAdmin/>},
  ]);
}

