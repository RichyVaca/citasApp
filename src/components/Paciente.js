import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {formatFecha} from '../helpers'

const Paciente = ({
  item,
  setModalVisible,
  setPaciente,
  pacienteEditar,
  pacienteEliminar,
  setModalPaciente,
}) => {
  const {paciente, fecha, id} = item;

  const formatFecha = fecha => {
    const newFecha = new Date(fecha);
    const opc = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return newFecha.toLocaleDateString('es-ES', opc);
  };

  return (
    <Pressable
      onPress={() => {
        setModalPaciente(true)
        setPaciente(item)
      }}
      >
      <View style={styles.container}>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.text}>{paciente}</Text>
        <Text style={styles.date}>{formatFecha(fecha)}</Text>
        <View style={styles.containerButtons}>
          <Pressable
            style={[styles.btn, styles.btnEditar]}
            onPress={() => {
              setModalVisible(true);
              pacienteEditar(id);
            }}>
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onPress={() => pacienteEliminar(id)}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#94a3b8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#6d28d9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  date: {
    color: '#374151',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#f59e0b',
  },
  btnEliminar: {
    backgroundColor: '#ef4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
});

export default Paciente;
