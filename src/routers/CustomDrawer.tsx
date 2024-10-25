import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView,  TouchableOpacity, Dimensions } from 'react-native';
import Styles from "../styles/CustomDrawerStyle";
import images from '../images/index';
const CustomDrawer = ({props}:any) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
        <View style={Styles.navigationContainer}>
            <View style={Styles.drawerTopbarView}>
                <Image source={images.logo} resizeMode="contain" style={Styles.homeLogo} />
            </View>
            <ScrollView style={{ width: screenWidth - 75, }}>
                <Text style={Styles.drawerboxheadertext}>Information</Text>
                <TouchableOpacity style={Styles.drawerbox}>
                    {/* <Image source={images.points} resizeMode="contain" style={Styles.drawerIcon} /> */}
                    <Text style={Styles.drawerboxtext}>Delivery Information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.drawerbox}>
                    {/* <Image source={images.points} resizeMode="contain" style={Styles.drawerIcon} /> */}
                    <Text style={Styles.drawerboxtext}>Terms & Conditions</Text>
                </TouchableOpacity>
                <Text style={Styles.drawerboxheadertext}>Customer Service</Text>
                <TouchableOpacity style={Styles.drawerbox}>
                    {/* <Image source={images.points} resizeMode="contain" style={Styles.drawerIcon} /> */}
                    <Text style={Styles.drawerboxtext}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.drawerbox}>
                    {/* <Image source={images.points} resizeMode="contain" style={Styles.drawerIcon} /> */}
                    <Text style={Styles.drawerboxtext}>Returns & Exchanges</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.drawerbox}>
                    {/* <Image source={images.points} resizeMode="contain" style={Styles.drawerIcon} /> */}
                    <Text style={Styles.drawerboxtext}>Site Map</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

export default CustomDrawer