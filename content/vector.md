## Ce este un vector?

Un **vector** în C++ este un container dinamic care permite stocarea și gestionarea eficientă a unei colecții de elemente de același tip. Flexibilitatea sa constă în capacitatea de a ajusta automat dimensiunea atunci când adăugăm sau eliminăm elemente, ceea ce îl face perfect pentru situații unde dimensiunea inițială nu este cunoscută.

!!! note "Comparat cu un array"
    Spre deosebire de array-uri, care au dimensiune fixă și nu permit redimensionare după crearea lor, vectorii se ajustează dinamic și sunt mult mai flexibili.

## Moduri de declarare si initializare

În STL, vectorii oferă o flexibilitate extraordinară pentru gestionarea colecțiilor dinamice de date. Iată câteva modalități de a declara și inițializa un vector, fiecare potrivit unui context specific:

1. **Vector Gol**: Un vector fără elemente, cu dimensiunea inițială zero.
   ```cpp
   vector<dataType> nume;
   ```
2. **Vector cu Dimensiune Fixă**: Inițializezi un vector cu o dimensiune specificată, iar elementele sunt setate la valorile implicite (0 pentru tipuri numerice).
   ```cpp
   vector<dataType> nume(size);
   ```
3. **Vector cu Dimensiune și Valoare Inițială**: Creezi un vector cu o dimensiune fixă, iar toate elementele sunt inițializate cu o valoare dată.
   ```cpp
   vector<dataType> nume(size, val);
   ```
4. **Vector Inițializat Direct cu Valori**: Inițializezi un vector specificând direct valorile elementelor, util pentru vectori mici sau când valorile sunt cunoscute la momentul inițializării.
   ```cpp
   vector<dataType> nume({val1, val2, ..., valn});
   ```
5. **Copierea unui Vector**: Creezi un vector nou, care este o copie exactă a unui alt vector.
   ```cpp
   vector<dataType> nume(alt_vector);
   ```

```cpp
#include <vector>
#include <iostream>

using namespace std;

int main() {
    vector<int> v1;              // Vector gol
    vector<int> v2(5);           // v2 = {0, 0, 0, 0, 0}
    vector<int> v3(5, 10);       // v3 = {10, 10, 10, 10, 10}
    vector<int> v4 = {1, 2, 3};  // v4 = {1, 2, 3}
    vector<int> v5(v4);          // Copie exactă a vectorului v4 -> v5 = {1, 2, 3}
}
```

## Lucrul cu pointeri

!!! note "Ce sunt pointerii?" 
    Pointerii sunt un concept fundamental în C++ care îți permite să lucrezi direct cu adresele de memorie. În loc să accesezi direct valoarea unei variabile, un pointer stochează adresa variabilei și permite manipularea datelor la acel nivel. Această abilitate este extrem de puternică în optimizarea memoriei și în crearea structurilor de date dinamice.

### Cum functioneaza un pointer?

Un pointer este o variabilă care stochează adresa de memorie a unei alte variabile. În esență, în loc să conțină direct o valoare, un pointer „pointează” către locația de memorie unde este stocată acea valoare.

Folosim simbolul `&` pentru a obtine adresa unei variabile, iar simbolul `*` in urmatoarele doua cazuri :

- Declararea unui pointer

```cpp
int a = 10;      // O variabilă normală
int* p = &a;     // Pointer către adresa variabilei 'a'
```

- Accesarea valorii unui pointer (dereferentiere)

```cpp
cout << *p;   // Afișează valoarea 10, adică valoarea lui 'a'
```

!!! warning "Atentie" 
    Când lucrezi cu pointeri, trebuie să te asiguri că nu dereferențiezi niciodată un pointer null sau invalid, deoarece aceasta poate duce la comportamente neprevăzute sau chiar la oprirea programului. Verifică întotdeauna pointerii înainte de utilizare.

## Transmiterea parametrilor prin referință

Un aspect adesea ignorat este modul în care vectorii sunt transmiși ca parametri într-o funcție. Dacă nu ești atent, complexitatea unui algoritm poate crește semnificativ din cauza creării de copii inutile.

Sa studiem urmatorul exemplu. Ce complexitate credeti care urmatorul program? Este $O(n)$, asa-i ? 

```cpp
#include <iostream>
#include <vector>

using namespace std;

int getSize(vector<int> a) {
  return (int) a.size();
}

int main() {
  int n = 1000000;
  vector<int> a(n, 0);

  long long sum = 0;
  for (int i = 1; i <= n; i++) {
    sum += getSize(a);
  }

  cout << sum;

  return 0;
}
```

**Nu!** Deși la prima vedere pare că algoritmul are o complexitate de $O(n)$, din cauza faptului că vectorul este **transmis prin valoare**, complexitatea reală devine $O(n^2)$. Asta deoarece de fiecare dată când funcția `getSize` este apelată, se creează o **copie completă** a vectorului `a`, care conține $10^6$ elemente.

!!! warning "Copierea unui Vector"
    Atunci când un vector este copiat, fiecare element al acestuia este duplicat în noul vector. Complexitatea operației de copiere este O(n), unde n este dimensiunea vectorului. În cazul unui vector mare, operațiunea poate consuma resurse semnificative de timp și memorie.

**Cum Rezolvăm Problema?**

Soluția este să transmitem vectorul **prin referință**. Astfel, în loc să se creeze o copie a vectorului, funcția va lucra direct cu referința la vectorul original, eliminând copierea și păstrând complexitatea la $O(n)$.

```cpp
int getSize(vector<int>& a) {  // Transmitem vectorul prin referință
  return (int) a.size();
}
```

!!! info "Explicație"
    Prin transmiterea prin referință (&), evităm copierea vectorului și lucrăm direct cu vectorul original.

---

## Funcții Esențiale pentru Vectori

### Accesarea și Modificarea Elementelor
- `operator[]`: Acces direct la un element (fără verificări de limită).
- `at()`: Acces direct la un element, similar cu `[]`, insa verifică dacă indicele este valid și aruncă o excepție dacă este invalid.
- `front()` și `back()`: Obținerea primului și ultimului element.

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
  // Inițializăm vectorul cu 5 elemente
  vector<int> v = {10, 20, 30, 40, 50};

  // Accesarea și modificarea elementelor folosind operator[] și at()
  cout << "Elementul din poziția 2 (folosind []): " << v[2] << endl;       // 20
  cout << "Elementul din poziția 2 (folosind at()): " << v.at(2) << endl;  // 20

  cout << "Primul element: " << v.front() << '\n';  // 10
  cout << "Ultimul element: " << v.back() << '\n';  // 50

  // Modificăm primul și ultimul element folosind front() și back()
  v.front() = 5;
  v.back() = 100;

  // Afișăm vectorul modificat
  cout << "Vector modificat: ";
  for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
  }
  cout << '\n';

  // Tentativă de accesare a unui element în afara limitelor
  try {
    cout << "Accesarea unui element în afara limitelor: " << v.at(10) << '\n';
  } catch (auto& e) {
    cout << "Excepție prinsă: " << e.what() << '\n';
  }

  return 0;
}

```

### Adăugare și Ștergere
- `push_back()`: Adaugă un element la sfârșit $O(1)$
- `pop_back()`: Elimină ultimul element - $O(1)$
- `insert()`: Inserează un element la o poziție specifică (potențial mai lent) - $O(n)$
- `erase()`: Șterge un element sau un interval de elemente - $O(n)$

![Inserare](https://cdn.sanity.io/images/7svjwvsp/production/4258b6f37259f0098f64144a983865f0ac540ffb-850x313.svg "Inserare")

![Stergere](https://cdn.sanity.io/images/7svjwvsp/production/8c2a4f2cd1480bc92f6922efab0fe6d861fc6120-850x301.svg "Stergere")

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
  vector<int> v;

  // Adăugăm elemente la sfârșit folosind push_back()
  for (int i = 1; i <= 5; ++i) {
    v.push_back(i * 10);  // v = {10, 20, 30, 40, 50}
  }

  // Inserăm un element în poziția 2
  v.insert(v.begin() + 2, 25);  // v = {10, 20, 25, 30, 40, 50}

  // Ștergem elementul din poziția 4
  v.erase(v.begin() + 4);  // v = {10, 20, 25, 30, 50}

  // Eliminăm ultimul element folosind pop_back()
  v.pop_back();  // v = {10, 20, 25, 30}

  return 0;
}
```

### Gestiunea Dimensiunii și Capacității
- `size()`: Returnează numărul de elemente actuale din vector.
- `capacity()`: Returnează capacitatea vectorului, adică spațiul de memorie alocat pentru vector.
- `clear()`: Șterge toate elementele din vector (nu reduce capacitatea).
- `resize()`: Redimensionează vectorul la o dimensiune specificată. Dacă dimensiunea nouă este mai mare decât dimensiunea curentă, elementele noi sunt inițializate cu valori implicite (0 pentru tipurile numerice). Dacă dimensiunea nouă este mai mică, vectorul va elimina elementele suplimentare.
- `reserve()`: Rezervă o anumită capacitate de memorie pentru vector. Acesta este util pentru a evita realocările frecvente atunci când știi că vei adăuga un număr mare de elemente. Memoria suplimentară este alocată din timp, fără a modifica dimensiunea efectivă a vectorului.

![Diferenta dintre size si capacity](https://cdn.sanity.io/images/7svjwvsp/production/c883c21c1bc2f7df08e3d11522758f48cd121591-850x337.svg "Diferenta dintre size si capacity")

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> v3 = {1, 2, 3, 4, 5};  // Inițializare vector cu 5 elemente

    // Afișăm dimensiunea și capacitatea inițială
    cout << "Dimensiunea inițială: " << v3.size() << endl;        // Dimensiunea inițială: 5
    cout << "Capacitatea inițială: " << v3.capacity() << endl;    // Capacitatea inițială: 5

    // Redimensionăm vectorul la 10 elemente
    v3.resize(10);
    cout << "După resize la 10 elemente, dimensiunea: " << v3.size() << endl;    // Dimensiunea: 10
    cout << "Capacitatea după resize: " << v3.capacity() << endl;                // Capacitatea: 10

    // Rezervăm spațiu pentru 20 de elemente
    v3.reserve(20);
    cout << "Capacitatea: " << v3.capacity() << endl;    // Capacitatea: 20

    // Golim vectorul, dar păstrăm capacitatea
    v3.clear();
    cout << "După clear, dimensiunea: " << v3.size() << endl;    // După clear, dimensiunea: 0
    cout << "Capacitatea după clear: " << v3.capacity() << endl; // Capacitatea după clear: 20

    return 0;
}
```

!!! warning "Complexitatea pentru clear()" Funcția clear() are o complexitate în timp de O(n), unde n este numărul de elemente din vector. Deși vectorul devine gol, trebuie să parcurgă fiecare element pentru a-l distruge. Aceasta face ca operațiunea să fie costisitoare în cazul vectorilor mari.

---

## Parcurgerea Vectorilor

În programarea competitivă, parcurgerea eficientă a vectorilor este esențială. Mai jos sunt cele mai comune metode:

### Bucla Clasică cu Index
Utilizată atunci când ai nevoie de control asupra indexării și modificării.

```cpp
for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}
```

### Range-Based For Loop
Cel mai simplu și elegant mod de a parcurge elementele.

```cpp
for (auto x : v) {
    cout << x << " ";
}
```

### Parcurgere cu Iteratori
De obicei, necesară când lucrezi cu STL și ai nevoie de flexibilitate.

Cum functioneaza `v.begin()`, `v.end()`?
  - `v.begin()`: Returnează un iterator către primul element al vectorului. Acesta funcționează ca un pointer către adresa de memorie a primului element.
  - `v.end()`: Returnează un iterator către următorul element după ultimul din vector.
  - `v.rbegin()`: Returneaza un iterator catre ultimul element din vector
  - `v.rend()`: Returneaza un iterator catre elementul de inainte de primul element

!!! note "Ce este un iterator?"
    Un iterator este un obiect în C++ care funcționează similar unui pointer, permițând accesul și parcurgerea elementelor din containere STL (precum vectori). Iteratorii oferă o modalitate sigură și standardizată de a traversa și modifica elementele unui container.

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};  // Inițializăm un vector cu 5 elemente

    // Parcugem vectorul de la inceput la final
    for (auto it = v.begin(); it != v.end(); ++it) // 10 20 30 40 50
        cout << *it << ' ';  // Dereferențiem iteratorul pentru a obține valoarea elementului
    
    // Parcurgem elementul de la final la inceput
    for(auto it = v.rbegin(); it != v.rend(); ++it) // 50 40 30 20 10
        cout << *it << ' ';

    return 0;
}
```

**Sfarsit!** Sper ca acum este clar cum sta treaba cu vectorii dinamici din STL, cum sa ii folositi si cand. Ca intotdeauna, daca aveti vreo intrebare, nu ezitati sa o lasati mai jos intr-un comentariu !

