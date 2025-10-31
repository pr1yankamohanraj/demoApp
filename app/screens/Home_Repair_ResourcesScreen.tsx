import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

type RootStackParamList = {
    Home_Repair_Resources: undefined;
    WebViewScreen: { url: string };
    LocalRepairAid: { region: string };
  };
  
type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Home_Repair_Resources'>;
};

const applyFEMAHelp = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://disasterloanassistance.sba.gov'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const applySBALoan = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://disasterloanassistance.sba.gov'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const checkUSDAEligibility = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.rd.usda.gov/programs-services/single-family-housing-repair-loans-grant'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findPros = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.homeadvisor.com'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const states = [
    { label: 'Alaska ', value: 'AK'},
    { label: 'Alabama', value: 'AL'},
    { label: 'Arkansas', value: 'AR'},
    { label: 'Arizona', value: 'AZ'},
    { label: 'California', value: 'CA'},
    { label: 'Colorado', value: 'CO'},
    { label: 'Connecticut', value: 'CT'},
    { label: 'Delaware', value: 'DE'},
    { label: 'Florida', value: 'FL'},
    { label: 'Georgia', value: 'GA'},
    { label: 'Hawaii', value: 'HI'},
    { label: 'Iowa', value: 'IA'},
    { label: 'Idaho', value: 'ID'},
    { label: 'Illinois', value: 'IL'},
    { label: 'Indiana', value: 'IN'},
    { label: 'Kansas', value: 'KS'},
    { label: 'Kentucky', value: 'KY'},
    { label: 'Louisiana', value: 'LA'},
    { label: 'Massachusetts', value: 'MA'},
    { label: 'Maryland', value: 'MD'},
    { label: 'Maine', value: 'ME'},
    { label: 'Michigan', value: 'MI'},
    { label: 'Minnesota', value: 'MN'},
    { label: 'Missouri', value: 'MO'},
    { label: 'Mississippi', value: 'MS'},
    { label: 'Montana', value: 'MT'},
    { label: 'North Carolina', value: 'NC'},
    { label: 'North Dakota', value: 'ND'},
    { label: 'Nebraska', value: 'NE'},
    { label: 'New Hampshire', value: 'NH'},
    { label: 'New Jersey', value: 'NJ'},
    { label: 'New Mexico', value: 'NM'},
    { label: 'Nevada', value: 'NV'},
    { label: 'New York', value: 'NY'},
    { label: 'Ohio', value: 'OH'},
    { label: 'Oklahoma', value: 'OK'},
    { label: 'Oregon', value: 'OR'},
    { label: 'Pennsylvania', value: 'PA'},
    { label: 'Rhode Island', value: 'RI'},
    { label: 'South Carolina', value: 'SC'},
    { label: 'South Dakota', value: 'SD'},
    { label: 'Tennessee', value: 'TN'},
    { label: 'Texas', value: 'TX'},
    { label: 'Utah', value: 'UT'},
    { label: 'Virginia', value: 'VA'},
    { label: 'Vermont', value: 'VT'},
    { label: 'Washington', value: 'WA'},
    { label: 'Wisconsin', value: 'WI'},
    { label: 'West Virginia', value: 'WV'},
    { label: 'Wyoming', value: 'WY'},
];

const contractorLicenseUrls: { [key: string]: string } = 
{
    AL: 'https://genius.alabama.gov/',
    AK: 'https://www.commerce.alaska.gov/cbp/main/Search/BusinessSearch.aspx',
    AZ: 'https://roc.az.gov/contractor-search',
    AR: 'https://www.ark.org/clb/index/index.php',
    CA: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    CO: 'https://dpo.colorado.gov/ContractorLicenseLookup',
    CT: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DE: 'https://dpr.delaware.gov/boards/contractors/',
    FL: 'https://www.myfloridalicense.com/wl11.asp',
    GA: 'https://verify.sos.ga.gov/verification/',
    HI: 'https://pvl.ehawaii.gov/pvlsearch/app',
    IA: 'https://contractor.iowa.gov/',
    ID: 'https://secure.ibol.idaho.gov/EIBSearch/ContractorLicense.aspx',
    IL: 'https://ilesonline.idfpr.illinois.gov/DPR/Lookup/LicenseLookup.aspx',
    IN: 'https://www.in.gov/pla/license.htm',
    KS: 'https://www.ksbtp.ks.gov/search-licenses',
    KY: 'https://oop.ky.gov/DLLQWeb/Default.aspx',
    LA: 'https://www.lacontractor.org/',
    MA: 'https://www.mass.gov/home-improvement-contractor-registration',
    MD: 'https://www.dllr.state.md.us/license/mhic/',
    ME: 'https://www.maine.gov/pfr/professionallicensing/',
    MI: 'https://www.lara.michigan.gov/colaLicVerify/',
    MN: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    MO: 'https://pr.mo.gov/',
    MS: 'https://www.msboc.us/',
    MT: 'https://ebiz.mt.gov/POL/',
    NC: 'https://nclbgc.org/online-license-search/',
    ND: 'https://www.nd.gov/sos/licensing/contractor/',
    NE: 'https://www.nebraska.gov/contractor/',
    NH: 'https://www.oplc.nh.gov/',
    NJ: 'https://newjersey.mylicense.com/verification/',
    NM: 'https://public.psiexams.com/search.jsp',
    NV: 'https://www.nvcontractorsboard.com/contractor-search',
    NY: 'https://www.dos.ny.gov/licensing/',
    OH: 'https://elicense.ohio.gov/oh_verifylicense',
    OK: 'https://cib.ok.gov/online-contractors-directory',
    OR: 'https://www.ccb.state.or.us/search/',
    PA: 'https://hicsearch.attorneygeneral.gov/',
    RI: 'https://www.crb.ri.gov/',
    SC: 'https://llr.sc.gov/Contractors/',
    SD: 'https://dlr.sd.gov/',
    TN: 'https://verify.tn.gov/',
    TX: 'https://www.tdlr.texas.gov/LicenseSearch/',
    UT: 'https://dopl.utah.gov/',
    VA: 'https://www.dpor.virginia.gov/LicenseLookup',
    VT: 'https://sos.vermont.gov/opr/find-a-professional/',
    WA: 'https://secure.lni.wa.gov/verify/',
    WI: 'https://licensesearch.wi.gov/',
    WV: 'https://labor.wv.gov/Pages/default.aspx',
    WY: 'https://contractors.wy.gov/',
};

  const DATA = [
    {
        type: 'header',
        title: 'Home Repair Resources',
        description: 'Find emergency assistance, financial aid, and trusted repair help after a flood. Access FEMA support, local programs, and volunteer services to restore your home safely and affordably. Learn how to document damage, avoid scams, and connect with licensed professionals in your area.',
    },
    {
        type: 'section',
        title: 'Volunteer Repair Services',
        content: [
            'Free or low-cost help from nonprofits:',
            {text: 'Team Rubicon - Disaster repair volunteers', indent: true},
            {text: 'Rebuilding Together - Home repair for low-income & elderly', indent: true},
            {text: 'Habitat for Humanity – Home preservation services', indent: true },
            {
                button: 'Request Volunteer Help',
            },
            {
                button: 'View Repair Nonprofit'
            }
        ]
    },
    {
        type: 'section',
        title: 'Financial Support',
        content: [
            'Get funding to repair or rebuild your home.',
            {text: 'SBA loans up to $200,000', indent: true},
            {text: 'USDA grants for rural, low-income homeowners', indent: true},
            {
                button: 'Apply for SBA Loan',
                action: applySBALoan,
            },
            {
                button: 'Check USDA Eligibility',
                action: checkUSDAEligibility, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Find Trusted Contractors',
        content: [
            'Avoid scams. Hire the right pros.',
            'Tips:', 
            {text: 'Ask for license and insurance', indent: true},
            {text: 'Dont pay all upfront', indent: true},
            {type: 'section', title: 'Check Contractor License'},
            {
                button: 'Find Verified Pros',
                action: findPros,
            }
        ]
    },
    {
        type: 'section',
        title: 'Document Repairs for Aid',
        content: [
            'Keep this checklist:',
            {text: 'Photos of damages and repairs', indent: true},
            {text: 'Receipts & Invoices', indent: true},
            {text: 'Permits and inspection forms', indent: true}
        ]
    },
    {
        type: 'section',
        title: 'Nearby Resources (Auto-Detected)',
        content: [
            'Based on your location:',
            {text: 'Local repair funding offices', indent: true},
            {
                button: 'Find Local Repair Centers',
            },
            {text: 'Mobile repair teams', indent: true},
            {
                button: 'View Mobile Teams Nearby',
            },
            {text: 'Permit and inspection offices', indent: true},
        ]
    },
    {
        type: 'section',
        title: 'Still Need Help?',
        content: [
            'Get one-on-one support.',
            {
                button: 'Talk to a Recovery Advisor',
            },
            {
                button: 'Post Your Needs to Community Pulse',
            },
        ]
    }
  ];

  export default function Home_Repair_ResourcesScreen({ navigation }: Props) {
    const [userLocation, setUserLocation] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);

    const selectState = () => {
      const stateOptions = states.map(state => ({
        text: state.label,
        onPress: () => setSelectedState(state.value)
      }));
      
      Alert.alert(
        'Select Your State',
        'Choose your state for USDA eligibility:',
        [
          ...stateOptions,
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const region = `${location.coords.latitude},${location.coords.longitude}`;
            setUserLocation(region);
        })();
    }, []);

    const renderItem = ({ item }: any) => {
        if (item.type === 'header') {
            return (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{item.title}</Text>
                    <Text style={styles.headerDescription}>{item.description}</Text>
                </View>
            );
        }

        if (item.type === 'section') {
            return (
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>

                    {item.title === 'Financial Support' && (
                        <>
                            <Text style={{ marginBottom: 8, fontWeight: '600', fontSize: 16, color: '#0A4E78' }}>Select your state:</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={selectState}
                            >
                                <Text style={styles.buttonText}>{selectedState || 'Select a state...'}</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {item.content?.map((entry: any, index: number) => {
                        if (typeof entry === 'string') {
                            return (
                                <View key={index} style={styles.bulletItem}>
                                    <Text style={styles.bulletDot}>•</Text>
                                    <Text style={styles.bulletText}>{entry}</Text>
                                </View>
                            );
                        } else if (entry.text) {
                            return (
                                <View key={index} style={[styles.bulletItem, { marginLeft: entry.indent ? 20 : 0 }]}>
                                    <Text style={styles.bulletDot}>•</Text>
                                    <Text style={styles.bulletText}>{entry.text}</Text>
                                </View>
                            );
                        } else if (entry.button) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.button}
                                    onPress={entry.action}
                                >
                                    <Text style={styles.buttonText}>{entry.button}</Text>
                                </TouchableOpacity>
                            );
                        } else {
                            return null;
                        }
                    })}
                </View>
            );
        }

        return null;
    };

    return (
      <View style={styles.screen}> 
        <HeaderWithMenu backRoute="/screens/Flood_RecoveryScreen" />
          <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.type}-${index}`}
            style={styles.flatList}
            contentContainerStyle={styles.listContent}
          />
      </View>
    );
}          

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#F1F9FC',
    },
    listContent: {
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    headerContainer: {
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: '#0A4E78',
      marginBottom: 12,
    },
    headerDescription: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#333',
      lineHeight: 22,
    },
    sectionContainer: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: '#0A4E78',
      marginBottom: 15,
    },
    bulletItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    bulletDot: {
      color: '#0A4E78',
      fontSize: 18,
      lineHeight: 24,
      marginRight: 10,
      marginTop: 2,
    },
    bulletText: {
      fontSize: 16,
      color: '#222',
      lineHeight: 24,
      flex: 1,
    },
    button: {
      backgroundColor: '#0A4E78',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      marginTop: 12,
      marginBottom: 8,
      alignSelf: 'flex-start',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    backButton: {
      top: -50,
    },
    flatList: {
      flex: 1,
    },
  });
