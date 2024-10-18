import React from "react";
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconL from 'react-native-vector-icons/MaterialIcons';
import IconN from 'react-native-vector-icons/Ionicons';
import IconT from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconG from 'react-native-vector-icons/Entypo';
import IconV from 'react-native-vector-icons/FontAwesome5';
import IconP from "react-native-vector-icons/Foundation";
import IconFO from "react-native-vector-icons/Fontisto";


const TabBarIcon = (props) => {
    const { icon = "", name, color, size } = props
    return (
        icon == "Feather" ?
            <IconF name={name} color={color} size={size} />
            :
            icon == "AntDesign" ?
                <IconA name={name} color={color} size={size} />
                :
                icon == "MaterialCommunityIcons" ?
                    <IconM name={name} color={color} size={size} />
                    :
                    icon == "FontAwesome" ?
                        <IconT name={name} color={color} size={size} />
                        :
                        icon == "EvilIcons" ?
                            <IconE name={name} color={color} size={size} />
                            :
                            icon == "Entypo" ?
                                <IconG name={name} color={color} size={size} />
                                :
                                icon == "FontAwesome5" ?
                                    <IconV name={name} color={color} size={size} />
                                    :
                                    icon == "Ionicons" ?
                                        <IconN name={name} color={color} size={size} />
                                        :
                                        icon == "Foundation" ?
                                            <IconP name={name} color={color} size={size} />
                                            :
                                            icon == "MaterialIcons" ?
                                                <IconL name={name} color={color} size={size} />
                                                :
                                                icon == "Fontisto" ?
                                                    <IconFO name={name} color={color} size={size} />
                                                    :
                                                    null
    )
}
export default TabBarIcon;