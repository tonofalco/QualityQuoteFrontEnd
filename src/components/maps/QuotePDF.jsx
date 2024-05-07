import { Document, Text, Page, StyleSheet, Image, View, Font } from '@react-pdf/renderer'
import { format } from 'date-fns/esm';
import es from 'date-fns/locale/es';

import Logo from '../../assets/img/logoGuerrero.png'
import datosAgencia from '../../assets/img/datosAgencia.png'
import { MontserratFonts } from '../../assets/fonts';

Object.entries(MontserratFonts).forEach(([weight, font]) => {
    Font.register({ family: `Montserrat-${weight}`, src: font });
});


const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 60, // Espacio alrededor de la página
    },
    image: {
        width: 165,
    },
    title: {
        fontFamily: 'Montserrat-bold',
        textAlign: 'start',
        textDecoration: 'underline',
        fontSize: 13.28,
        marginBottom: 3,
    },
    text: {
        fontFamily: 'Montserrat-medium',
        textAlign: 'justify',
        letterSpacing: 1,
        fontSize: 11,
        marginBottom: 3,
    },
    date: {
        fontFamily: 'Montserrat-light',
        textAlign: 'right',
        fontSize: 10.72,
        marginBottom: 20,
    },
    text__clauses: {
        fontFamily: 'Montserrat-light',
        textAlign: 'justify',
        fontSize: 9,
        marginBottom: 3,
    },
    text__footer: {
        fontFamily: 'Montserrat-bold',
        textAlign: 'center',
        fontSize: 11,
        marginBottom: 3,
    },
    section_header: {
        flexDirection: 'row', // Esto colocará los elementos en la misma fila
        justifyContent: 'space-between', // Esto agrega espacio entre las imágenes
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 60,
    },
    section_body: {
        marginBottom: 20,
    },
    section_footer: {
        flexDirection: 'row', // Esto colocará los elementos en la misma fila
        justifyContent: 'space-around', // Esto agrega espacio entre las imágenes
        alignItems: 'center',
        marginTop: 60,
    },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell_12: {
        fontFamily: 'Montserrat-regular',
        fontSize: 11,
        padding: 6,
        marginLeft: 10,
        width: '100%',
    },
    tableCell6: {
        fontFamily: 'Montserrat-regular',
        fontSize: 11,
        padding: 6,
        marginLeft: 10,
        width: '50%',
        borderRightWidth: 0.1
    },
    tableTitle: {
        fontFamily: 'Montserrat-bold',
        textAlign: 'center',
        fontSize: 13.28,
        marginBottom: 1.5,
    },
    tableText1: {
        fontFamily: 'Montserrat-medium',
        textAlign: 'start',
        letterSpacing: 1,
        fontSize: 11,
    },
    tableText2: {
        fontFamily: 'Montserrat-medium',
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 11,
    },

});


export const QuotePDF = ({ startDate, endDate, sourceRef, destinationRef, stops, precioVan }) => {


    const today = new Date();
    const formattedDate = format(today, "'Chilpancingo de los Bravos' 'a' dd 'de' MMMM 'del' yyyy", { locale: es });
    const formattedStartDay = format(startDate, "dd 'de' MMMM 'del' yyyy", { locale: es })
    const formattedEndDay = format(endDate, "dd 'de' MMMM 'del' yyyy", { locale: es })

    // console.log(today);
    // console.log(startDate);
    // console.log(formattedStartDay);


    const finalList = stops.length + 2

    return (
        <Document>
            <Page style={styles.page}>

                <View style={styles.section_header}>
                    <Image style={styles.image} src={Logo} />
                    <Image style={styles.image} src={datosAgencia} />
                </View>

                <View style={styles.section_body}>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>

                <View style={styles.section_body}>
                    <Text style={styles.title}>A quien corresponda.</Text>
                </View>

                <View style={styles.section_body}>
                    <Text style={styles.text}>
                        Agradecemos el considerar a la agencia de Viajes Quality para realizar la siguiente cotización.
                        A continuacion se presenta la propuesta del servicio correspondiente,
                        con salida programada del {formattedStartDay} al {formattedEndDay}, detallando la informacion del viaje:
                    </Text>
                </View>

                <View style={styles.section_body}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell_12}>
                                <Text style={styles.tableTitle}>ITINERARIO</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            {
                                <ol>
                                    <li>
                                        <View style={styles.tableCell_12}><Text style={styles.tableText1}>1. {sourceRef}</Text></View>
                                    </li>
                                    <li>
                                        {stops.map((stop, index) => <View style={styles.tableCell_12} key={index}><Text style={styles.tableText1}>{index + 2}. {stop}</Text></View>)}
                                    </li>
                                    <li>
                                        <View style={styles.tableCell_12}><Text style={styles.tableText1}>{finalList}. {destinationRef}</Text></View>
                                    </li>
                                </ol>
                            }
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell6}><Text style={styles.tableTitle}>TRANSPORTE</Text></View>
                            <View style={styles.tableCell6}><Text style={styles.tableTitle}>COSTO TOTAL</Text></View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell6}><Text style={styles.tableText2}>TOYOTA VAN 15 PLAZAS</Text></View>
                            <View style={styles.tableCell6}><Text style={styles.tableText2}>{precioVan}</Text></View>
                        </View>
                    </View>
                </View>

                <View style={styles.section_body}>
                    <Text style={styles.text__clauses}>* En caso de requerir factura, los precios no incluyen el impuesto del IVA.</Text>
                    <Text style={styles.text__clauses}>* Precios y disponibilidad sujeto a cambios sin previo aviso.</Text>
                    <Text style={styles.text__clauses}>* Este documento es solo una cotización y no representa ningún tipo de contrato.</Text>
                </View>

                <View style={styles.section_footer}>
                    <Text style={styles.text__footer}>Quedamos a sus órdenes ante cualquier otra información requerida.</Text>
                </View>

            </Page>
        </Document>
    )
}
