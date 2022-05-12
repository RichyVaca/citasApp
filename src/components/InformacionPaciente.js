import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {formatFecha} from '../helpers'


const InformacionPaciente = ({paciente, setPaciente, setModalPaciente}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Información {''}
        <Text style={styles.titleBold}>Paciente</Text>
      </Text>
      <Pressable
        style={styles.btnCerrar}
        onPress={() => {
          setModalPaciente(false)
          setPaciente({})
        }}>
        <Text style={styles.btnCerrarTexto}>Cerrar</Text>
      </Pressable>
      <View style={styles.content}>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Nombre: </Text>
          <Text style = {styles.valor}>{paciente.paciente}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Propietario: </Text>
          <Text style = {styles.valor}>{paciente.propietario}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Email: </Text>
          <Text style = {styles.valor}>{paciente.emailPropietario}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Tel: </Text>
          <Text style = {styles.valor}>{paciente.telefono}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Fecha Alta: </Text>
          <Text style = {styles.valor}>{formatFecha(paciente.fecha)}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Sintomas: </Text>
          <Text style = {styles.valor}>{paciente.sintomas}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f59e0b',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titleBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    marginVertical: 20,
    backgroundColor: '#e06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCerrarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  campo:{
    marginBottom: 10
  },
  label:{
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12
  },
  valor:{
    fontWeight: '700',
    fontSize: 20,
    color: '#334155'
  }
});

export default InformacionPaciente;
