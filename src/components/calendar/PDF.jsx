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
        textAlign: 'center',
        fontSize: 13.28,
        marginBottom: 3,
    },
    subtitle: {
        fontFamily: 'Montserrat-light',
        textAlign: 'center',
        fontSize: 10.72,
        marginBottom: 3,
    },
    textSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 8,
    },
    textContainer: {
        flex: 1,
        borderBottom: '1px solid #000',
        paddingBottom: 2, // Ajusta según sea necesario
    },
    text__Transport: {
        fontFamily: 'Montserrat-regular',
        textAlign: 'center',
        fontSize: 10.72,
        marginBottom: 3,
    },
    text__reference: {
        fontFamily: 'Montserrat-bold',
        textAlign: 'justify',
        fontSize: 10.72,
        marginRight: 6,
        marginBottom: 8,
    },
    text__evet_value: {
        fontFamily: 'Montserrat-medium',
        textAlign: 'center',
        fontSize: 10.72,
    },
    text__clauses: {
        fontFamily: 'Montserrat-light',
        textAlign: 'justify',
        fontSize: 9,
    },
    text__firms: {
        fontFamily: 'Montserrat-light',
        textAlign: 'center',
        fontSize: 10.72,
        marginBottom: 3,
        borderTop: '1px solid #000',
        paddingHorizontal: 30,
    },
    section_header: {
        flexDirection: 'row', // Esto colocará los elementos en la misma fila
        justifyContent: 'space-between', // Esto agrega espacio entre las imágenes
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 40,
    },
    section_body: {
        marginBottom: 20,
    },
    section_footer: {
        flexDirection: 'row', // Esto colocará los elementos en la misma fila
        justifyContent: 'space-around', // Esto agrega espacio entre las imágenes
        alignItems: 'center',
        marginTop: 40,
    },

});

export const PDF = ({ transportNumber, transport, seats, nameClient, phone, departure, destination, dateStart, dateEnd, timeStart, timeEnd, notes, status, price, advance, due }) => {

    const noteValue = notes.length <= 0 ? '-' : notes

    const today = new Date();
    const formattedDate = format(today, "'Chilpancingo de los Bravos' 'a' dd 'de' MMMM 'del' yyyy", { locale: es });


    return (
        <Document>
            <Page style={styles.page}>
                    <Text style={styles.text__clauses}>st. {status}</Text>

                <View style={styles.section_header}>
                    <Image style={styles.image} src={Logo} />
                    <Image style={styles.image} src={datosAgencia} />
                </View>

                <View style={styles.section_body}>
                    <Text style={styles.title}>Giva Magico Tours S.A de C.V</Text>
                    <Text style={styles.title}>R.F.C GMT1601193RL</Text>
                    <Text style={styles.title}>CONTRATO DE TRANSPORTACION</Text>
                    <Text style={styles.title}>CONVENCIONES, ESTUDIOS, PLACER.</Text>
                </View>
                <View style={styles.section_body}>
                    {/* <Text style={styles.subtitle}>Chilpancingo de los Bravos a XX de XXXXX del XXXX</Text> */}
                    <Text style={styles.subtitle}>{formattedDate}</Text>



                </View>
                <View style={styles.section_body}>
                    <Text style={styles.subtitle}>ESTA EMPRESA CONVIENE EN PROPORCIONAR UN SERVICIO DE EXCURSIÓN EN LOS TÉRMINOS Y CONDICIONES QUE A CONTINUACIÓN SE PRECISAN, RECONOCIENDO A LOS INTERESADOS QUE EL MISMO </Text>
                </View>
                <View style={styles.section_body}>
                    <Text style={styles.text__Transport}>POR {transportNumber} {transport.toUpperCase()} DE {seats} PLAZAS (ASIENTOS) </Text>
                </View>

                <View style={styles.textSection}>
                    <Text style={styles.text__reference}>Cliente:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{nameClient}</Text>
                    </View>
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.text__reference}>Telefono:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{phone}</Text>
                    </View>
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.text__reference}>Destino:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{destination}</Text>
                    </View>
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.text__reference}>Fecha de salida:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{dateStart}</Text>
                    </View>
                    <Text style={styles.text__reference}>Fecha de regreso:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{dateEnd}</Text>
                    </View>
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.text__reference}>Hora de salida:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{timeStart}</Text>
                    </View>
                    <Text style={styles.text__reference}>Hora de regreso:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{timeEnd}</Text>
                    </View>
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.text__reference}>Lugar de salida:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{departure}</Text>
                    </View>
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.text__reference}>Nota:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{noteValue}</Text>
                    </View>
                </View>
                <View style={[styles.textSection, { marginBottom: 32 }]}>
                    <Text style={styles.text__reference}>Precio:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{price}</Text>
                    </View>
                    <Text style={styles.text__reference}>Anticipo:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{advance}</Text>
                    </View>
                    <Text style={styles.text__reference}>Saldo:</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text__evet_value}>{due}</Text>
                    </View>
                </View>

                <View style={styles.section_body}>
                    <Text style={styles.text__clauses}>* EL CONTRATANTE SERÁ RESPONSABLE DE LOS DESPERFECTOS CAUSADOS A LA UNIDAD EN SERVICIO.</Text>
                    <Text style={styles.text__clauses}>* EL NÚMERO DE PASAJEROS NO EXCEDERÁ DE LO INDICADO.</Text>
                    <Text style={styles.text__clauses}>* AL INICIAR EL VIAJE SE LIQUIDARÁ EL TOTAL DEL SERVICIO.</Text>
                    <Text style={styles.text__clauses}>* ESTE CONTRATO NO INLCUYE ESTACIONAMIENTOS.</Text>
                </View>

                <View style={styles.section_footer}>
                    <Text style={styles.text__firms}>FIRMA CLIENTE</Text>
                    <Text style={styles.text__firms}>VIAJES QUALITY</Text>
                </View>

            </Page>
        </Document>
    );
};