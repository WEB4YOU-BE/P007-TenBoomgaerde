"use client"
import {Tables} from "@/lib/database.types";
import {useEffect, useState} from "react";
import {Document, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import PdfReservationRecordIndex from "@/components/pdf/pdf-record";

interface pdfProps {
    reservations: Tables<"reservations">[];
}


const styles = StyleSheet.create({
    body: {
        margin: 20
    },
    h1: {
        fontSize: 30
    },
    table: {
        display: "flex",
        borderStyle: "solid",
        marginHorizontal: 40
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "13%",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tableColHead: {
        width: "13%",
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: "#d3d3d3"
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
    },
    tableCellHead: {
        margin: "auto",
        marginTop: 5,
        fontSize: 11,
    }
})

const WeekPDF = ({reservations}: pdfProps) => {
    return (
        <Document>
            <Page size={"A4"} orientation={"landscape"}>
                <View style={{display: 'flex', justifyContent: "center", margin: 20}}>
                    <Text wrap={false} style={styles.h1}>Reservaties deze week</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Reservatienummer</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Datum(s)</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Uur</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Zaal</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Status</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Reserveerder</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Gsm-nummer</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Code</Text>
                        </View>
                    </View>
                    {
                        reservations
                            .map((reservation, index) =>
                                <PdfReservationRecordIndex key={index}
                                                           reservationYear={reservation.reservation_year}
                                                           reservationNumber={reservation.reservation_number}
                                                           users={reservation.users} rooms={reservation.rooms}
                                                           start_date={reservation.start_date}
                                                           end_date={reservation.end_date}
                                                           start_hour={reservation.start_hour}
                                                           end_hour={reservation.end_hour}
                                                           accessCode={reservation.access_code}
                                                           status={reservation.status}/>
                            )
                    }
                </View>
            </Page>
        </Document>
    )
}

export default function WPdf({reservations}: pdfProps) {
    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, []);

    return <div className={"h-full"}>
        {client ? (
            <PDFViewer className={"w-full h-full"}>
                <WeekPDF reservations={reservations}/>
            </PDFViewer>
        ) : (
            <div>Loading...</div>
        )}
    </div>
}