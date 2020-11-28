import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { ScrollView } from 'react-native-gesture-handler'

const Signup2 = () => {
    const [date, setdate] = useState()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.dob}>
                <DatePicker
                    style={{width: 200}}
                    date={date}
                    mode="date"
                    placeholder="select date of birth"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {setdate(date)}}
                />
            </View>
        </ScrollView>
    )
}

export default Signup2

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    dob:{
        flexDirection:'row'
    },
    dobText:{
        fontSize:16
    }
})
