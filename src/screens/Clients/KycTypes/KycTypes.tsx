
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { KycEditDeleteButtons } from "../KycEditDeleteButtons/KycEditDeleteButtons";
import { Icons } from "./KycTypesIcon";
import { ClientDetailsType } from "../DTOs/ClientDetails";
import { KYCTypes } from "../DTOs/ClientProps";


const KycTypes: React.FC<ClientDetailsType> = ({ clientDetails, setClientDetails }) => {
  const displayWithSegments = (values: any, segmentLength: number, separator: string = " "): string => {
    if (typeof values === 'object' && values !== null) {
      const key = Object.keys(values)[0]; 
      values = values[key];  
    }
    if (typeof values !== 'string') {
      values = String(values); 
    }
    const regex = new RegExp(`.{1,${segmentLength}}`, "g");
    return values.match(regex)?.join(separator) || values;
  };
  
  return (
    <>
      {clientDetails.kycDetails.map((item, index) =>
        item.value ? (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.kYCRow}>
              <View style={styles.iconContainer}>
                <Text>{Icons[item.kycType] || Icons.DEFAULT}</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>
                  {item.kycType === KYCTypes.AADHAAR
                    ? displayWithSegments((item.value), 4) // Format Aadhaar values
                    : item.value} 
                </Text>
              </View>
            </View>
            <KycEditDeleteButtons
              clientDetails={clientDetails}
              setClientDetails={setClientDetails}
              selectedItem={{ id: index, item }}
            />
          </View>
        ) : null
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kYCRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
  },
  valueContainer: {
    // flex: 1,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export { KycTypes };
