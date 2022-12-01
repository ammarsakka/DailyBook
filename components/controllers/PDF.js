import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer'
import moment from 'moment'
import { TableHeader } from './pdf/TableHeader'
import { TableRow } from './pdf/TableRow'

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        color: "black",
        padding: 10
    },
    viewer: {
        width: '100%', //the pdf viewer will take up all of the width and height
        height: window.innerHeight / 1.2,
        borderRadius: 5,
    },
    text: {
        fontSize: '12px',
        color: 'black',
        textTransform: 'capitalize'
    },
    subText: {
        fontSize: '8px',
        color: 'gray',
        textTransform: 'capitalize'
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 100
    }
})

export const PDF = ({ details, charts, chart, period, user }) => {
    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size='A4' style={styles.page}>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        margin: 10
                    }}>
                        <Text style={styles.text}>
                            DailyBooks
                        </Text>
                        <Text style={styles.text}>
                            {moment().format('D/M/Y')}
                        </Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        margin: 10
                    }}>
                        {
                            charts.map((item) => (
                                item.sub.map((sub, index) => {
                                    if (sub.account_sub_id === chart) {
                                        return (
                                            <Text style={styles.text} key={index}>
                                                Account name: {sub.account_sub_name}
                                            </Text>
                                        )
                                    }
                                })
                            ))
                        }
                        <Text style={styles.text}>
                            Period Date: {moment(period[0]).format('DD/MM/Y')} - {moment(period[1]).format('DD/MM/Y')}
                        </Text>
                    </View>
                    <View style={{
                        margin: 10,
                        border: '2px solid black',
                        borderRadius: 2
                    }}>
                        <TableHeader />
                        {
                            details.map((item) => {
                                var type
                                var transation_id = []
                                var amount
                                var data = []

                                item.transation_details.map((transation) => {
                                    if (transation.account_sub_id === chart) {
                                        type = transation.Transaction_type
                                        amount = transation.Transaction_amount
                                    }
                                })

                                item.transation_details.map((transation) => {
                                    if (transation.Transaction_type !== type) {
                                        transation_id.push({
                                            account_sub_id: transation.account_sub_id,
                                            transaction_details_id: transation.transaction_details_id
                                        })
                                        if (parseFloat(transation.Transaction_amount) < parseFloat(amount)) {
                                            data.push(transation)
                                        }
                                    }
                                })

                                data.length === 0 &&
                                    item.transation_details.map((transation) => {
                                        if (transation.account_sub_id === chart) {
                                            data.push(transation)
                                        }
                                    })

                                return (
                                    data.map((transation, index) => (
                                        <TableRow
                                            details={transation}
                                            key={index}
                                            date={item.created_at}
                                            name={
                                                charts.map((item) => (
                                                    item.sub.map((sub) => {
                                                        if (sub.account_sub_id === transation_id[index].account_sub_id) {
                                                            return sub.account_sub_name
                                                        }
                                                    })
                                                ))
                                            }
                                        />
                                    ))
                                )
                            })
                        }
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            margin: 10
                        }}
                        fixed
                    >
                        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <Image src={`/images/users/${user.avatar}`} style={styles.avatar} />
                            <View style={{ marginLeft: 4 }}>
                                <Text
                                    style={styles.text}
                                >
                                    {user.full_name}
                                </Text>
                                <Text
                                    style={styles.subText}
                                >
                                    {user.role}
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={styles.text}
                            render={({ pageNumber, totalPages }) =>
                                `Page ${pageNumber} of ${totalPages}`
                            }
                        />
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}
