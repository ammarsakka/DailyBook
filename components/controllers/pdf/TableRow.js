import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import moment from 'moment'

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        textTransform: 'capitalize',
        border: '1px solid black',
        padding: 4
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    }
})

const currency = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
})

export const TableRow = ({ date, details, name }) => {
    return (
        <View
            style={styles.view}
        >
            <Text style={[styles.text, { width: '15%' }]}>
                {moment(date).format('D/M/Y')}
            </Text>
            <Text style={[styles.text, { width: '15%' }]}>
                {name}
            </Text>
            <Text style={[styles.text, { width: '40%' }]}>
                {details.Transaction_name}
            </Text>
            <Text style={[styles.text, { width: '15%', textAlign: 'right' }]}>
                {details.Transaction_type === 'debit' ? currency.format(details.Transaction_amount) : ''}
            </Text>
            <Text style={[styles.text, { width: '15%', textAlign: 'right' }]}>
                {details.Transaction_type === 'credit' ? currency.format(details.Transaction_amount) : ''}
            </Text>
        </View>
    )
}
