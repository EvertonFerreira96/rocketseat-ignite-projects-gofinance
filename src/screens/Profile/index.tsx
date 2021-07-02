import React from 'react';
import { View, Text, TextInput, Button} from 'react-native';

export const Profile: React.FC = () => {
  return (
      <View>


          <Text testID="text-title"> Perfil </Text>

          <Text>Name</Text>
          <TextInput testID="input-name" placeholder="Nome" autoCorrect={false} value="Everton" /> 
          <Text>Sobrenome</Text>
          <TextInput testID="input-surname" placeholder="Sobrenome" value="Ferreira" />
          <Button title="Salvar" onPress={() => {}} /> 
      </View>
  )
}