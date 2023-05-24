const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, getDocs } = require('firebase-admin/firestore');

// Importa o arquivo de configuração do serviço Firebase Admin
const serviceAccount = require('./projeto-d29d3-firebase-adminsdk-583zz-e25bfcd12f.json');

// Inicializa o aplicativo Firebase Admin usando as credenciais do serviço
initializeApp({
  credential: cert(serviceAccount)
});

// Obtém uma instância do Firestore
const db = getFirestore();

// Obtém uma referência para a coleção 'cities' no Firestore
const citiesRef = db.collection('cities');

// Define documentos na coleção 'cities' CREATE
citiesRef.doc('SF').set({
  name: 'San Francisco', state: 'CA', country: 'USA',
  capital: false, population: 860000
});
citiesRef.doc('LA').set({
  name: 'Los Angeles', state: 'CA', country: 'USA',
  capital: false, population: 3900000
});
citiesRef.doc('DC').set({
  name: 'Washington, D.C.', state: null, country: 'USA',
  capital: true, population: 680000
});
citiesRef.doc('TOK').set({
  name: 'Tokyo', state: null, country: 'Japan',
  capital: true, population: 9000000
});
citiesRef.doc('BJ').set({
  name: 'Beijing', state: null, country: 'China',
  capital: true, population: 21500000
});

// Obtém uma referência para a coleção 'cities'
const collectionRef = db.collection('cities');

/*Lista todos o documentos SELECT/READ */
collectionRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {

      // Cria uma referência para um documento em outra coleção usando o ID do documento atual
      const cityRef = db.collection('cities').doc(doc.id);

      // Obtém o documento usando a referência
      const unity = cityRef.get();

      // Acessa os dados do documento obtido
      cityRef.get().then(unity => {
        if (unity && unity.exists) {
          // Imprime o ID do documento e seus dados
          console.log(unity.id, '=>', unity.data());
        }
      })
        .catch(err => {
          // Trata erros ao obter o documento
          console.log(err);
        });
    });
  })
  .catch(error => {
    // Trata erros ao obter os documentos da coleção
    console.error('Erro ao obter documentos:', error);
  });



/*Definido Campos para realizar a atualização UPDATE*/
const updates = {
  country: 'USA',
  capital: false,
  name: 'Los Angeles',
  state: 'CA',
  population: 3898747,
};

const documentRef = db.collection('cities').doc('LA');

// Faça o update no documento
documentRef.update(updates)
  .then(() => {
    console.log('Documento atualizado com sucesso!');
    
  })
  .catch(error => {
    console.error('Erro ao atualizar documento:', error);
  });

const docRef = db.collection('cities').doc('BJ');

// Exclua um documento DELETE
docRef.delete()
  .then(() => {
    console.log('Documento excluído com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao excluir documento:', error);
  });
