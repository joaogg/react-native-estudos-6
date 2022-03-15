import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, SectionList } from 'react-native';
import { Header, Icon, Card, ListItem, Button } from 'react-native-elements';
import axios from 'axios'

const URL = 'http://teamgg.esy.es/list.php'

export default class listScreen extends Component {
  constructor() {
    super();
    this.state = { listaItens: [] }

    this.refresh = this.refresh.bind(this);
  }

  refresh(Nome = '') {
    const search = Nome ? `&Nome__regex=/${Nome}/` : ''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(response => { this.setState({ listaItens: response.data }); })
      .catch(() => { console.log('Erro ao recuperar os dados'); });
  }

  componentDidMount() {
    this.refresh()
  }

  //Detail Screen to show from any Open detail button
  render() {
    var c = 1;
    var arrayJogadores;
    let button;

    const nameList = this.state.listaItens.map(function (item, x) {
      return (
        item.Equipes.map(function (q, z) {
          arrayJogadores = q.Jogadores.split(",");


          return (

            arrayJogadores.map(function (nome, i) {

              if ((i + 1) % q.Tamanho == 0 || i == 0) {
                return <View>
                  <Text>Equipe {i + 1}º:</Text>
                  <Text>- {nome}</Text>
                </View>;
              }

              if (true) {
                return <Text>- {nome}</Text>;
              }

            })
          );

        })
      );
    })


    return (
      <ScrollView>


        <Text>{"\n ==================================== \n"}</Text>

        <View>
          {nameList}
        </View>

        <Text>{"\n\n"}</Text>

        <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
