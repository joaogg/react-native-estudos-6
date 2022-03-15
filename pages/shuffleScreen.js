import React, { Component } from 'react';
import { Button, Platform, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Text, View, ScrollView, Picker } from 'react-native';
import { Header, Icon, Card, Image } from 'react-native-elements';

type Props = {};
export default class shuffleScreen extends Component<Props> {

  constructor() {
    super();
    this.state = { jogadores: '', tamanho: 0, loading: false, disabled: false, listaItens: [] }
  }

  saveData = () => {
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    var arrayJogadores, jogadores;

    jogadores = this.state.jogadores;
    arrayJogadores = jogadores.split(",");

    shuffle(arrayJogadores);

    this.setState({
      listaItens: arrayJogadores,
      loading: true
    });


    fetch('http://teamgg.esy.es/insert.php',
      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            jogadores: arrayJogadores.toString(),
            tamanho: this.state.tamanho
          })
      });

  }

  render() {

    var valueTamanho = this.state.tamanho;

    return (
      <View>
        <Card>
          <Text>Digite o nome do jogadores:</Text>
          <TextInput underlineColorAndroid="transparent" placeholder="Jogador 1, Jogador 2, Jogador 3, Jogador 4" style={styles.textInput} onChangeText={(text) => this.setState({ jogadores: text })} />

          <Text>Quantidade de jogadores por equipe:</Text>
          <Picker selectedValue={this.state.tamanho} onValueChange={(itemValue, itemIndex) => this.setState({ tamanho: itemValue })}>
            <Picker.Item label="Tamanho da Equipe" value="0" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
          </Picker>

          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            onPress={this.saveData}
            title='Gerar Equipes' />

          <Text>
            {
              (this.state.loading)
                ?
                "\n\nEquipes: \n======"
                :
                null
            }
          </Text>
          <Text>
            {
              (this.state.loading)
                ?
                this.state.listaItens.map(function (item, i) {
                  if ((i + 1) % valueTamanho == 0)
                    return (
                      <Text style={{ width: 180, height: 50, marginTop: 8 }} >{"\n" + item + "\n"}====== {"\n"}</Text>
                    );

                  return (
                    <Text style={{ width: 180, height: 50, marginTop: 8 }} >{item}</Text>
                  );
                })
                :
                null
            }
          </Text>

          {this.state.loading = false}


        </Card>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
