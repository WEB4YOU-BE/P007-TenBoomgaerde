"use client"
import {useEffect, useState} from "react";
import {Document, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import PdfReservationRecordIndex from "@/components/pdf/pdf-record";
import { Tables } from "@/types/supabase/database.types";

interface pdfProps {
    reservations: Tables<"reservations">[];
}

function getWeekDates() {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return {start, end}
}

function formatDate({date}: {
    date: Date
}) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        margin: 20,
        textAlign: "center",
    },
    h1: {
        fontSize: 30,
        marginBottom: 10
    },
    date: {
        fontSize: 15,
    },
    table: {
        display: "flex",
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        borderBottom: 1,
        backgroundColor: "#BBF7D0",
        paddingVertical: 10,
    },
    tableCol: {
        width: "12%",
    },
    tableColHead: {
        width: "12%",
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
        <Document
            title={"Reservaties " + formatDate({date: getWeekDates().start}) + " tot " + formatDate({date: getWeekDates().end})}>
            <Page size={"A4"} orientation={"landscape"}>
                <View style={styles.view}>
                    <Text wrap={false} style={styles.h1}>Bevestigde reservaties deze week</Text>
                    <Text wrap={false}
                          style={styles.date}>{formatDate({date: getWeekDates().start})} tot {formatDate({date: getWeekDates().end})}</Text>
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
                            <Text style={styles.tableCellHead}>Reserveerder</Text>
                        </View>
                        <View style={styles.tableColHead}>
                            <Text style={styles.tableCellHead}>Organisatie</Text>
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
                                                           status={reservation.status}
                                                           gefactureerd={reservation.gefactureerd}
                                                           organization={reservation.organizations}/>
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