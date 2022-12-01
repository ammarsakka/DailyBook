import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        textTransform: 'capitalize',
        fontWeight: 600,
        border: '1px solid black',
        padding: 3
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    }
})

export const TableHeader = () => {
    return (
        <View
            style={styles.view}
        >
            <Text style={[styles.text, { width: '15%' }]}>
                date
            </Text>
            <Text style={[styles.text, { width: '15%' }]}>
                name
            </Text>
            <Text style={[styles.text, { width: '40%' }]}>
                description
            </Text>
            <Text style={[styles.text, { width: '15%' }]}>
                debit
            </Text>
            <Text style={[styles.text, { width: '15%' }]}>
                credit
            </Text>
        </View>
    )
}
