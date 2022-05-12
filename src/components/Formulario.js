import {
  Modal,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';

const Formulario = ({
  modalVisible,
  cerrarModal,
  setPacientes,
  pacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteA,
}) => {
  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState('');
  const [propietario, setPropietario] = useState('');
  const [emailPropietario, setEmailPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmailPropietario(pacienteObj.emailPropietario);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    if (
      [paciente, propietario, emailPropietario, fecha, sintomas].includes('')
    ) {
      Alert.alert(
        'Error', // Encabezado
        'Todos los campos son obligatorios', // Mensaje
        //[{text: 'CANCEL', style: 'cancel'}, {text: 'OK'}] //Boton text
      );

      return;
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      emailPropietario,
      telefono,
      fecha,
      sintomas,
    };

    // Revisar si es un registro nuevo o edicion
    if (id) {
      // Editando
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      );

      setPacientes(pacientesActualizados);
      setPacienteA({})
    } else {
      // Nuevo registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    // Modificar el state del paciente
    cerrarModal()
    setId('')
    setPaciente('');
    setPropietario('');
    setEmailPropietario('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.containerForm}>
        <ScrollView>
          <Text style={styles.title}>
            {pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.titleBold}>Cita</Text>
          </Text>
          {/* Btn cancelar */}
          <Pressable
            style={styles.btnCancelar}
            onPressOut={() => {
              cerrarModal()
              setId('')
              setPacienteA({})
              setPaciente('');
              setPropietario('');
              setEmailPropietario('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');
            }}>
            <Text style={styles.btnCancelarTexto}>Cancelar</Text>
          </Pressable>

          <View style={styles.item}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              style={styles.input}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              style={styles.input}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              placeholder="example@email.com"
              placeholderTextColor={'#666'}
              style={styles.input}
              keyboardType="email-address"
              value={emailPropietario}
              onChangeText={setEmailPropietario}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Telefono Propietario</Text>
            <TextInput
              placeholder="55-555-555"
              placeholderTextColor={'#666'}
              style={styles.input}
              keyboardType="phone-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
            {/* Picker */}
            <View style={styles.item}>
              <Text style={styles.label}>Fecha Alta</Text>
              <View style={styles.fechaContenedor}>
                <DatePicker
                  date={fecha}
                  locale="es"
                  onDateChange={date => setFecha(date)}
                />
              </View>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              placeholder=""
              placeholderTextColor={'#666'}
              style={[styles.input, styles.sintomasInput]}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: '#6d28d9',
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
  btnCancelar: {
    marginVertical: 20,
    backgroundColor: '#5827a4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  item: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFFF',
    borderRadius: 15,
  },
  btnNuevaCita: {
    marginVertical: 30,
    marginHorizontal: 30,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827a4',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 16,
  },
});

export default Formulario;
