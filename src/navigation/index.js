//Screens
import Home from '../screens/home/Home';
import Loading from '../screens/loading/Loading';
import Login from '../screens/login/Login';
import SignUp from '../screens/signup/SignUp';
import Submissions from '../screens/submissions/Submissions';
import Taxes from '../screens/taxes/Taxes';
import { NavigatorScreenStack } from './NavigatorStack';

//not loged user
export const loginNavigator = [
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'signup',
    component: SignUp,
  },
  {
    name: 'loading',
    component: Loading,
  },
];

export const userNavigator = [
  {
    name: 'loading',
    component: Loading,
  },
  {
    name: 'submissions',
    component: Submissions,
  },
  {
    name: 'home',
    component: Home,
  },
  {
    name: 'taxes',
    component: Taxes,
  },
  {
    name: 'navStack',
    component: NavigatorScreenStack,
  },
]
