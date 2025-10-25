import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Heading, Text, VStack, Card, Spinner } from '@gluestack-ui/themed';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgZm0ubqyX-Mm3_DU_MbNEx-maZecpQ0Y",
  authDomain: "meu-primeirissimo-project.firebaseapp.com",
  projectId: "meu-primeirissimo-project",
  storageBucket: "meu-primeirissimo-project.firebasestorage.app",
  messagingSenderId: "166981460909",
  appId: "1:166981460909:web:5e42a49d3e5194ac573724"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [nomes, setNomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore().collection('Nomes');
      const snapshot = await nomesCollection.get();
      const data: any[] = [];
      snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setNomes(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center" bg="$backgroundLight">
        <Spinner size="large" />
        <Text mt="$2" color="$muted500">Carregando nomes...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$backgroundLight" alignItems="center" justifyContent="center" p="$4">
      <Heading size="xl" color="$primary700" mb="$4">
        Lista de Nomes
      </Heading>

      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            m="$2"
            p="$4"
            borderRadius="$xl"
            bg="$backgroundLight100"
            shadowColor="$backgroundDark900"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.2}
            shadowRadius={3}
            width={300}
          >
            <VStack space="xs" alignItems="center">
              <Text fontSize="$lg" color="$textDark900" bold>
                {item.Nome} {item.Sobrenome}
              </Text>
            </VStack>
          </Card>
        )}
      />
    </Box>
  );
}
