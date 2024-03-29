import {StyleSheet, Text, View} from "@react-pdf/renderer";
import React from "react";

interface ReservationRecordIndexProps {
    reservationYear: string;
    reservationNumber: number | null
    users: { id: string, firstname: string, lastname: string, phone: string };
    rooms: { name: string };
    start_date: string;
    end_date: string;
    start_hour: { start_hour: string };
    end_hour: { end_hour: string };
    accessCode: number | null;
    status: string | null;
    gefactureerd: boolean;
    organization: { name: string };
}

const styles = StyleSheet.create({
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        borderBottom: 1,
        paddingVertical: 7
    },
    tableCol: {
        width: "12%",
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
    },
})

export default function PdfReservationRecordIndex({
                                                      reservationYear,
                                                      reservationNumber,
                                                      users,
                                                      rooms,
                                                      start_date,
                                                      end_date,
                                                      start_hour,
                                                      end_hour,
                                                      accessCode,
                                                      organization
                                                  }: ReservationRecordIndexProps) {

    const voornaam = users.firstname ?? ""
    const familienaam = users.lastname ?? ""

    return <View style={styles.tableRow}>
        <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{reservationYear.substring(0, 4) + '-' + reservationNumber}</Text>
        </View>
        <View style={styles.tableCol}>
            <Text
                style={styles.tableCell}>{start_date === end_date ? new Date(start_date).toLocaleDateString('nl-NL', {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }) : new Date(start_date).toLocaleDateString('nl-NL', {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }) + " tot " + new Date(end_date).toLocaleString('nl-NL', {day: "2-digit", month: "2-digit"})}</Text>
        </View>
        <View style={styles.tableCol}>
            <Text
                style={styles.tableCell}>{start_hour.start_hour.substring(0, 5) + "-" + end_hour.end_hour.substring(0, 5)}</Text>
        </View>
        <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{rooms.name}</Text>
        </View>
        <View style={styles.tableCol}>
            <Text
                style={styles.tableCell}>{voornaam + " " + familienaam}</Text>
        </View>
        <View style={styles.tableCol}>
            <Text
                style={styles.tableCell}>{organization === undefined || organization === null ? "" : organization.name}</Text>
        </View>
        <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{users.phone}</Text>
        </View>
        <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{accessCode === null ? 'Onbekend' : accessCode}</Text>
        </View>
    </View>
}