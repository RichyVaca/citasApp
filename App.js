import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import Formulario from './src/components/Formulario';
import InformacionPaciente from './src/components/InformacionPaciente';
import Paciente from './src/components/Paciente';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);



  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id);
    setPaciente(pacienteEditar[0]);
  };

  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas Eliminar este paciente?',
      'Un paciente eliminado no se puede eliminar',
      [
        {text: 'Cancelar'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              pacientesState => pacientesState.id !== id,
            );
            setPacientes(pacientesActualizados);
          },
        },
      ],
    );
  };

  const cerrarModal = () =>{
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
              />
            );
          }}
        />
      )}
      {modalVisible && (
        <Formulario
          cerrarModal = {cerrarModal}
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      <Modal visible={modalPaciente} animationType="slide">
        <InformacionPaciente
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6d28d9',
  },
  btnNuevaCita: {
    backgroundColor: '#6d28c9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 20,
  },
});

export default App;
