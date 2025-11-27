import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function DicasMotivacionais() {
 const dicas = [
  "Acredite no seu potencial! Grandes conquistas começam com pequenos passos, e cada esforço conta na sua jornada.",
  "Cada passo que você dá em direção ao seu objetivo importa. Não desanime pelos obstáculos, eles são apenas parte do aprendizado.",
  "Não desista, mesmo que pareça difícil. Grandes coisas levam tempo, e a paciência é a chave para o sucesso duradouro.",
  "Seja a mudança que você quer ver no mundo. Inspire outros com suas ações e atitudes, pois elas têm mais poder do que palavras.",
  "O sucesso é a soma de pequenos esforços repetidos todos os dias. Persistência e disciplina são o que transformam sonhos em realidade.",
  "Aprenda com os erros e siga em frente. Cada falha é uma oportunidade de crescimento e uma lição para evoluir.",
  "A persistência é o caminho para a vitória. Mesmo quando tudo parecer perdido, continue caminhando com determinação.",
  "Você é capaz de coisas incríveis! Nunca subestime o poder da sua mente e do seu coração em alcançar grandes feitos.",
  "Desafios existem para mostrar sua força interior. Encare cada dificuldade com coragem e veja como você cresce com cada experiência.",
  "Mantenha o foco nos seus objetivos e não permita que distrações te desviem do caminho. Cada dia é uma chance de se aproximar do seu sonho.",
  "Acredite que você merece o melhor. Quando você valoriza a si mesmo, as oportunidades certas surgem e você se fortalece a cada passo.",
  "A vida recompensa aqueles que se arriscam e persistem. Saia da zona de conforto e descubra o quanto você é capaz de realizar.",
  "Não tenha medo de começar de novo. Cada novo começo é uma chance de escrever uma história melhor e mais significativa.",
  "O caminho para o sucesso é construído com determinação, coragem e amor pelo que você faz. Confie no processo e siga em frente."
];


  const [dicaAtual, setDicaAtual] = useState(dicas[0]);
  const [textoAnimado, setTextoAnimado] = useState("");
  const [indiceLetra, setIndiceLetra] = useState(0);

  // Função para escolher dica aleatória
  const proximaDica = () => {
    let novaDica;
    do {
      novaDica = dicas[Math.floor(Math.random() * dicas.length)];
    } while (novaDica === dicaAtual);
    setDicaAtual(novaDica);
    setTextoAnimado("");
    setIndiceLetra(0);
  };

  // Animação tipo "digitando"
  useEffect(() => {
    if (indiceLetra < dicaAtual.length) {
      const timeout = setTimeout(() => {
        setTextoAnimado((prev) => prev + dicaAtual[indiceLetra]);
        setIndiceLetra(indiceLetra + 1);
      }, 20); // velocidade da digitação (ms)
      return () => clearTimeout(timeout);
    }
  }, [indiceLetra, dicaAtual]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.dica}>{textoAnimado}</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={proximaDica}>
        <Text style={styles.botaoTexto}>Próxima Dica</Text>
        <View style={{backgroundColor:'#0D47A1',borderRadius:999, alignItems:'center', justifyContent:'center', padding:10, width:50, height:50,}}>
            <Image source={require('../../../assets/atualizar.png')} style={{tintColor:'#ffff', width:11, height:16,}}/>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D47A1", // azul escuro
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  card: {
    width: "90%",
    minHeight: 180,
    backgroundColor: "#1565C0", // azul mais claro para contraste
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 30,
  },
  dica: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
  },
  cursor: {
    color: "#fff",
    fontSize: 22,
    marginTop: 5,
    opacity: 0.8,
  },
  botao: {
    backgroundColor: "#ffffffff",
    flexDirection:'row',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 30,
     justifyContent: "space-between",
    alignItems: "center",
    gap:37,
  },
  botaoTexto: {
    color: "#0D47A1",
    fontSize: 18,
    fontWeight: "bold",
  },
});
