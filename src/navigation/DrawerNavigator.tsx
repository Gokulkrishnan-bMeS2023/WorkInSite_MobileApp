import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import { Dimensions } from 'react-native';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
import LoginScreen from '../screens/Authantication/LoginScreen';
import UserCreationScreen from '../screens/Users/UserCreationScreen/UserCreationScreen';
import UserListScreen from '../screens/Users/UserListScreen/UserListScreeen';
import UserEditScreen from '../screens/Users/UserEditScreen/UserEditScreen';
import RouteName from './RouteName';
import ChangePinScreen from '../screens/ProfileScreen/ChangePinScreen';
import ContactListScreen from '../screens/Contacts/ContactListScreen/ContactListScreen';
import ContactCreationScreen from '../screens/Contacts/ContactCreationScreen/ContactCreationScreen';
import ContactEditScreen from '../screens/Contacts/ContactEditScreen/ContactEditScreen';
import SupplierListScreen from '../screens/Suppliers/SupplierListScreen/SupplierListScreen';
import SupplierCreationScreen from '../screens/Suppliers/SupplierCreationScreen/SupplierCreationScreen';
import SupplierEditScreen from '../screens/Suppliers/SupplierEditScreen/SupplierEditScreen';
import WorkerListScreen from '../screens/Workers/WorkerListScreen/WorkerListScreen';
import WorkerCreationScreen from '../screens/Workers/WorkerCreationScreen/WorkerCreationScreen';
import WorkerEditScreen from '../screens/Workers/WorkerEditScreen/WorkerEditScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import { WorkerCategoryCreationPage } from '../screens/Workers/WorkerCategoryCreationScreen/WorkerCategoryCreationPage';
import { WorkerCategoryEditPage } from '../screens/Workers/WorkerCategoryEditScreen/WorkerCategoryEditPage';
import { SiteCreationScreen } from '../screens/Sites/SiteCreationScreen/SiteCreationScreen';
import SiteEditScreen from '../screens/Sites/SiteEditScreen/SiteEditScreen';
import SiteListScreen from '../screens/Sites/SiteListScreen/SiteListScreen';
import ClientListScreen from '../screens/Clients/ClientListScreen/ClientListScreen';
import { ClientCreationScreen } from '../screens/Clients/ClientCreationScreen/ClientCreationScreen';
import ClientEditScreen from '../screens/Clients/ClientEditScreen/ClientEditScreen';
import { UnitCreationScreen } from '../screens/Unit/UnitCreationScreen/UnitCreationScreen';
import { MaterialCreationScreen } from '../screens/Materials/MaterialCreationScreen/MaterialCreationScreen';
import MaterialListScreen from '../screens/Materials/MaterialListScreen/MaterialListScreen';
import WorkRateAbstract from '../screens/Workers/WorkRateAbstractCreate/WorkRateAbstractCreate';
import WorkerCategoryListScreen from '../screens/Workers/WorkerCategoryListScreen/WorkerCategoryListScreen';
import WorkRateAbstractListScreen from '../screens/Workers/WorkRateAbstractList/WorkRateAbstractList';
import WorkRateAbstractEdit from '../screens/Workers/WorkRateAbstractEdit/WorkRateAbstractEdit';
import { WorkModeCreationScreen } from '../screens/Attendance/WorkMode/WorkModeCreationScreen/WorkModeCreationScreen';
import { ShiftCreationScreen } from '../screens/Attendance/Shift/ShiftCreationScreen/ShiftCreationScreen';
import AttendanceCreationScreen from '../screens/Attendance/AttendanceCreationScreen/AttendanceCreationScreen';

// import { PurchaseMaterialCreationScreen } from '../screens/PurchaseMaterial/PurchaseMaterialCreationScreen/PurchaseMaterialCreationScreen';
// import { PurchaseCreationScreen } from '../screens/Purchase/PurchaseCreationScreen/PurchaseCreationScreen';
// import PurchaseListScreen from '../screens/Purchase/PurchaseListScreen/PurchaseListScreen';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <Drawer.Navigator
      // initialRouteName="HomeTabs"
      initialRouteName={RouteName.SPLASH_SCREEN}
      drawerContent={props => <CustomDrawerContent {...props} />} // Custom Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          flex: 1,
          marginLeft: -10,
          width: screenWidth - 100,
        },
      }}>
      <Drawer.Screen
        name={RouteName.SPLASH_SCREEN}
        component={SplashScreen}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name={RouteName.Home_SCREEN}
        component={BottomTabNavigator}
      // options={{title: 'WorkInSite'}}
      />
      <Drawer.Screen
        name={RouteName.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ swipeEnabled: false }}
      />
      {/* <Drawer.Screen
        name={RouteName.REGISTRATION_SCREEN}
        component={RegisterScreen}
        options={{swipeEnabled: false}}
      /> */}
      <Drawer.Screen
        name={RouteName.USER_LIST_SCREEN}
        component={UserListScreen}
      />
      <Drawer.Screen
        name={RouteName.USER_CREATION_SCREEN}
        component={UserCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.USER_EDIT_SCREEN}
        component={UserEditScreen}
      />
      <Drawer.Screen
        name={RouteName.CONTACT_LIST_SCREEN}
        component={ContactListScreen}
      />
      <Drawer.Screen
        name={RouteName.CONTACT_CREATION_SCREEN}
        component={ContactCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.CONTACT_EDIT_SCREEN}
        component={ContactEditScreen}
      />
      <Drawer.Screen
        name={RouteName.CLIENT_LIST_SCREEN}
        component={ClientListScreen}
      />
      <Drawer.Screen
        name={RouteName.CLIENT_CREATION_SCREEN}
        component={ClientCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.CLIENT_EDIT_SCREEN}
        component={ClientEditScreen}
      />
      <Drawer.Screen
        name={RouteName.SITE_CREATION_SCREEN}
        component={SiteCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.SITE_EDIT_SCREEN}
        component={SiteEditScreen}
      />
      <Drawer.Screen
        name={RouteName.SITE_LIST_SCREEN}
        component={SiteListScreen}
      />
      <Drawer.Screen
        name={RouteName.WORKER_LIST_SCREEN}
        component={WorkerListScreen}
      />
      <Drawer.Screen
        name={RouteName.WORKER_CREATION_SCREEN}
        component={WorkerCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.WORKER_EDIT_SCREEN}
        component={WorkerEditScreen}
      />
      <Drawer.Screen
        name={RouteName.WORKER_CATEGORY_CREATION_SCREEN}
        component={WorkerCategoryCreationPage}
      />
      <Drawer.Screen
        name={RouteName.WORKER_CATEGORY_EDIT_SCREEN}
        component={WorkerCategoryEditPage}
      />
      <Drawer.Screen
        name={RouteName.WORKER_CATEGORY_LIST_SCREEN}
        component={WorkerCategoryListScreen}
      />
      <Drawer.Screen
        name={RouteName.WORK_RATE_ABSTRACT_CREATION}
        component={WorkRateAbstract}
      />
      <Drawer.Screen
        name={RouteName.WORK_RATE_ABSTRACT_LIST}
        component={WorkRateAbstractListScreen}
      />
      <Drawer.Screen
        name={RouteName.WORK_RATE_ABSTRACT_EDIT}
        component={WorkRateAbstractEdit}
      />
      <Drawer.Screen
        name={RouteName.SUPPLIER_LIST_SCREEN}
        component={SupplierListScreen}
      />
      <Drawer.Screen
        name={RouteName.SUPPLIER_CREATION_SCREEN}
        component={SupplierCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.SUPPLIER_EDIT_SCREEN}
        component={SupplierEditScreen}
      />
      <Drawer.Screen
        name={RouteName.MATERIAL_CREATION_SCREEN}
        component={MaterialCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.MATERIAL_LIST_SCREEN}
        component={MaterialListScreen}
      />
      {/* <Drawer.Screen
        name={RouteName.MATERIAL_EDIT_SCREEN}
        component={MaterialEditScreen}
      /> */}
      <Drawer.Screen
        name={RouteName.UNIT_CREATION_SCREEN}
        component={UnitCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.WORK_MODE_CREATION_SCREEN}
        component={WorkModeCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.SHIFT_CREATION_SCREEN}
        component={ShiftCreationScreen}
      />
      <Drawer.Screen name={RouteName.ATTENDANCE_CREATION_SCREEN}
        component={AttendanceCreationScreen} />
      {/* <Drawer.Screen
        name={RouteName.PURCHASE_CREATION_SCREEN}
        component={PurchaseCreationScreen}
      />
      <Drawer.Screen
        name={RouteName.PURCHASE_LIST_SCREEN}
        component={PurchaseListScreen}
      />
      <Drawer.Screen
        name={RouteName.PURCHASEMATERIAL_CREATION_SCREEN}
        component={PurchaseMaterialCreationScreen}
      /> */}
      {/* <Drawer.Screen
        name={RouteName.PURCHASE_EDIT_SCREEN}
        component={PurchaseEditScreen}
      /> */}
      <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />
      <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Drawer.Screen name="ChangePinScreen" component={ChangePinScreen} />
    </Drawer.Navigator>
  );
}
