
-----31/03/222-----

In questo progetto provo ad implementare un timer che salvi ogni secondo
su un objectstore del suo indexedDb (cioè su una tabella del suo database)
la data. Questo allo scopo di ovviare il problema dato dal fatto che 
il timer potrebbe fermarsi da solo non appena il thread di javascript viene messo in pause. 
Questo accade perchè javascript è un linguaggio single threaded.

https://developers.google.com/web/ilt/pwa/working-with-indexeddb
In questo modo intendo imparare ad usare gli indexedDb per creare un database 
(non relazionale) disponibile per un qualsiasi progetto frontend. 
Devo capire come usarlo in ionic (quando non voglio usare lo storage).

https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
L'alternativa a questo sarebbe creare uno shared worker ch esegua 
il timer, che non dovrebbe essere mai interrotto.

MANCA: 
 • codice per agguinta dati all'indexedDb
 • codice per eliminazione dati di una tabella
 • codice per eliminazione tabella 
 • codice per eliminazione indexedDb 