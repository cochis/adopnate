import * as firebase from 'firebase';
export const retornaDocumentos = (
  snapshot: firebase.default.firestore.QuerySnapshot
) => {
  const documentos: any[] = [];
  snapshot.forEach((snapHijo) => {
    documentos.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });
  console.log(documentos);
  return documentos;
};
