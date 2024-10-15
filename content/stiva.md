Stiva este o structura foarte des intalnita in programarea competitiva, asa ca daca esti aici, deja cunosti cum functioneaza, asa ca ne vom concentra pe probleme clasice ce trebuie cunoscute daca participi sau vrei sa te pregatesti pentru concursuri de programare sau olimpiada.

## Probleme clasice 

### 1. [stack_max_min](https://kilonova.ro/problems/2107/)

Aceasta probleme cuprinde toate cazurile ce pot aparea in problema, insa ne vom concentra doar pe primele doua subpunctele, celelalte doua rezolvandu-se analog.

- Care este cel mai mare $i$, $i$ < $p$ pentru care $v_i$ > $v_p$ ? Daca nu exista, se va afisa $-1$.
- Care este cel mai mare $i$, $i$ > $p$ pentru care $v_i$ > $v_p$ ? Daca nu exista, se va afisa $-1$.

#### Solutia brute-force

Pentru fiecare $p$, parcurgem toate elementele din partea stanga $[0, p-1]$ si verificam daca $v_i$ > $v_p$. Pastram primul $i$ care indeplineste aceasta conditie. Similar si pentru dreapta.

```cpp
int find_left(vector<int>& v, int p) {
  int result = -1;
  for (int i = 0; i < p; ++i) {
    if (v[i] > v[p]) {
      result = i;
    }
  }
  return result;
}
```

Care este complexitatea acestei solutii? Se observa usor ca algoritmul va avea complexitea $O(N \cdot Q)$ $\approx$ $O(N^2)$.

#### Solutia folosind stiva

Pentru a ajunge la complexitatea $O(N)$, vom precalcula acesti doi vectori folosind o stiva monotonic descrescatoare. 

Cum functioneaza stiva ?

- Pentru partea stângă: Vom parcurge vectorul de la stânga la dreapta și vom folosi o stivă descrescătoare. Stiva va păstra indicii elementelor care sunt candidati pentru a fi cel mai mare $i < p$ pentru care $v_i > v_p$. De fiecare data cand intalnim un nou $v_p$, vom scoate din stivă toate elementele care sunt mai mici sau egale cu $v_p$, deoarece acestea nu mai pot fi răspunsuri valide pentru $v_p$.
- Pentru partea dreaptă: Parcurgem vectorul de la dreapta la stânga folosind aceeași tehnică, pentru a găsi cel mai mare $i > p$ pentru care $v_i > v_p$.

```cpp
vector<int> calculateLeft(vector<int>& v) {
  int n = v.size();
  vector<int> left(n, -1);
  stack<int> st;
  
  for (int p = 0; p < n; ++p) {
    // Eliminam toate elementele mai mici sau egale
    while (!st.empty() && v[st.top()] <= v[p]) {
      st.pop();
    }

    // Retinem rezultatul pentru indicele curent
    left[p] = (!st.empty() ? st.top() : -1);

    // Adaugam indicele curent
    st.push(p);
  }
  
  return left;
}
```

#### De ce complexitatea acestui algoritm este liniara ?
Putem demonstra ca aceasta solutie este liniara facand urmatoarele observatii:
- Fiecare element este adaugat o singura data in stiva
- Fiecare element este eliminat o singura data din stiva

Desi pentru unele elemente $v_p$ eliminam mai multe elemente (efectuam mai multe operatii de pop), *analiza amortizata* ne arata ca, in medie, numarul de operatii ramane proportional cu $N$, numarul elemente din vector. Astfel, in cel mai rau caz, numarul de operatii de pop si push este $2 \cdot N$, complexitate fiind $O(n)$. 

### 2. [Advertisment](https://cses.fi/problemset/task/1142)

Problema Advertisement din setul de probleme CSES solicită găsirea ariei maxime a unui dreptunghi ce poate fi atașat pe un gard, unde fiecare panou vertical are o înălțime variabilă. Problema este similară cu cea a *celui mai mare dreptunghi într-un histogram*, o problemă clasică ce poate fi rezolvată eficient folosind o stivă.

- Ai un gard compus din $n$ panouri verticale, fiecare având o înălțime dată.
- Trebuie să atașezi un dreptunghi de reclamă astfel încât aria dreptunghiului să fie maximă.
- Dreptunghiul trebuie să fie atașat pe panouri consecutive.

#### Solutia brute-force

O abordare directă ar fi să considerăm fiecare pereche de panouri consecutive și să calculăm aria maximă pentru fiecare dreptunghi posibil. Acest lucru ar presupune să parcurgem toate perechile $[i,j]$ și să calculăm cea mai mică înălțime în acel interval, apoi să determinăm aria.

Complexitatea acestei solutii este $O(n^2)$.

#### Solutia optimizata folosind stiva

Această problemă poate fi rezolvată eficient în $O(n)$ folosind o stivă. Ideea este să folosim o stivă monotonică pentru a gestiona înălțimile panourilor și pentru a calcula aria maximă a dreptunghiurilor formate din panouri consecutive.

- Parcurgem înălțimile de la stânga la dreapta și folosim o stivă pentru a păstra indicii panourilor cu înălțimi în ordine crescătoare.
- De fiecare dată când întâlnim o înălțime mai mică, calculăm ariile posibile pentru dreptunghiurile care se termină la acea înălțime. Aria este calculată folosind panourile din stivă și înălțimea minimă.
- La final, calculam ariile posibile si pentru panourile ramase in stiva

Dacă întâlnim o înălțime mai mică decât cea din vârful stivei, știm că dreptunghiul format folosind înălțimea din vârful stivei trebuie să fie procesat, deoarece nu putem extinde acel dreptunghi mai departe.

Dacă înălțimea panoului curent este mai mică decât înălțimea panoului din vârful stivei, înseamnă că acel panou nu mai poate contribui la un dreptunghi extins la dreapta.

![Skyline](https://cdn.sanity.io/images/7svjwvsp/production/e65d05585bc0efd67d077e9b38b6df0cc538d3ac-850x3227.svg "Skyline")

```cpp
#include <iostream>
#include <stack>
#include <vector>

using namespace std;

int calculeaza_arie_maxima(vector<int>& inaltimi) {
  int n = inaltimi.size();
  stack<int> st;   
  int arie_maxima = 0; 

  // Parcurgem fiecare panou pe rând
  for (int i = 0; i < n; ++i) {
    // Eliminam din stiva toate inaltimile mai mari decat inaltimea curenta
    while (!st.empty() && inaltimi[st.top()] > inaltimi[i]) {
      int inaltime_curenta = inaltimi[st.top()];
      st.pop(); 

      // Calculăm lățimea dreptunghiului pentru înălțimea curentă
      int latime_curenta = st.empty() ? i : i - st.top() - 1;

      // Calculăm aria și actualizam aria maxima
      arie_maxima = max(arie_maxima, inaltime_curenta * latime_curenta);
    }
    // Adăugăm indicele curent în stivă
    st.push(i);
  }

  // Procesăm elementele rămase în stivă
  while (!st.empty()) {
    int inaltime_curenta = inaltimi[st.top()];
    st.pop();

    // Calculăm lățimea dreptunghilui pentru înălțimea curentă
    int latime_curenta = st.empty() ? n : n - st.top() - 1;

    arie_maxima = max(arie_maxima, inaltime_curenta * latime_curenta);
  }

  return arie_maxima;
}

int main() {
  int n;  // Numărul de panouri
  cin >> n;

  vector<int> inaltimi(n);
  for (int i = 0; i < n; ++i) {
    cin >> inaltimi[i];
  }

  cout << calculeaza_arie_maxima(inaltimi) << endl;

  return 0;
}
```

### 3. [Maximum Building I](https://cses.fi/problemset/task/1147)

Ai o hartă a unei păduri unde fiecare pătrat poate fi gol `.` sau poate avea un copac `*`. Trebuie să afli care este aria maximă a unui dreptunghi care poate fi construit în pădure fără a tăia vreun copac. Adică trebuie să găsim dreptunghiul maxim format doar din celule goale `.`.

Această problemă este o extensie a problemei clasice de găsire a celui mai mare dreptunghi într-un histogram, dar aplicată pe o matrice. Fiecare rând din matrice poate fi considerat ca un histogram, iar pe măsură ce parcurgem rândurile, construim un histogram pentru fiecare coloana bazat pe celulele goale `.`. Apoi aplicăm algoritmul pentru a găsi cel mai mare dreptunghi într-un histogram pentru fiecare rând.

Modul de rezolvare:
- Pentru fiecare rând al matricei, tratăm coloanele deasupra lui ca un histogram de înălțimi.
- Înălțimea unei coloane va crește atâta timp cât găsim celule goale (.) consecutive pe acea coloană.
- Pentru fiecare rând, aplicăm algoritmul pentru găsirea celui mai mare dreptunghi într-un histogram pentru a determina aria maximă.
- Repetăm acest proces pentru fiecare rând din matrice și găsim aria maximă globală.

![Maximum Building I](https://cdn.sanity.io/images/7svjwvsp/production/c7d0e8826daa837f45ff9b22366b38c9e197e87f-850x947.svg "Maximum Building I")


```cpp
#include <iostream>
#include <stack>
#include <vector>

using namespace std;

int calculeaza_arie_maxima_histogram(vector<int>& inaltimi) {
  int n = inaltimi.size();
  stack<int> st;
  int arie_maxima = 0;

  // Parcurgem înălțimile histogramului
  for (int i = 0; i < n; ++i) {
    // Procesăm toate înălțimile mai mari decât cea curentă
    while (!st.empty() && inaltimi[st.top()] >= inaltimi[i]) {
      int h = inaltimi[st.top()];
      st.pop();

      int latime = st.empty() ? i : i - st.top() - 1;
      arie_maxima = max(arie_maxima, h * latime);
    }
    st.push(i);
  }

  // Procesăm elementele rămase în stivă
  while (!st.empty()) {
    int h = inaltimi[st.top()];
    st.pop();

    int latime = st.empty() ? n : n - st.top() - 1;
    arie_maxima = max(arie_maxima, h * latime);
  }

  return arie_maxima;
}

int calculeaza_arie_maxima_matrice(vector<vector<char>>& padure, int n, int m) {
  vector<int> inaltimi(m, 0);
  int arie_maxima = 0;

  // Parcurgem fiecare rând din matrice
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < m; ++j) {
      // Actualizăm înălțimile histogramului pentru fiecare coloană
      if (padure[i][j] == '.') {
        inaltimi[j]++;
      } else {
        inaltimi[j] = 0;  // Resetăm înălțimea dacă întâlnim un copac (*)
      }
    }

    // Calculăm aria maximă pentru histogramul curent
    arie_maxima = max(arie_maxima, calculeaza_arie_maxima_histogram(inaltimi));
  }

  return arie_maxima;
}

int main() {
  int n, m;
  cin >> n >> m;
  vector<vector<char>> padure(n, vector<char>(m));

  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < m; ++j) {
      cin >> padure[i][j];
    }
  }

  cout << calculeaza_arie_maxima_matrice(padure, n, m) << endl;

  return 0;
}
```

<ResourcesTable header="Bibliografie si resurse suplimentare" 
  resource='[
    {
      "source": "RoAlgo EDU",
      "title": "Materia Arbori de Intervale",
      "link": "https://edu.roalgo.ro/mediu/stack/",
      "description": "Contine posibile implementari stiva + probleme rezolvate",
      "sourceLink": "https://edu.roalgo.ro"
    },
    {
      "source": "USACO Guide",
      "title": "Stacks",
      "link": "https://usaco.guide/gold/stacks",
      "description": "Contine multe probleme diverse date la USACO",
      "sourceLink": "https://usaco.guide"
    },
    {
      "source": "CPPI",
      "title": "Stiva - Aplicatii",
      "link": "https://cppi.sync.ro/materia/lectii/stiva%20aplicații.pdf",
      "description": "Un articol foarte bun care cuprinde idei si rezolvari la probleme cu grad de dificultate variat",
      "sourceLink": "https://cppi.sync.ro"
    }
  ]'
/>

<ProblemSetTable problemSetName="Probleme antrenament"
    problemSet='[
        {
            "solutionSlug": "categorie-stiva-pbinfo",
            "source": "Pbinfo",
            "name": "Probleme stiva pbinfo",
            "link": "https://www.pbinfo.ro/probleme/categorii/86/structuri-de-date-liniare-stiva?start=40",
            "sourceLink": "https://www.pbinfo.ro",
            "badge": "easy",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "nrapp",
            "source": "PbInfo",
            "name": "NrApp",
            "link": "https://www.pbinfo.ro/probleme/2733/nrapp",
            "sourceLink": "https://www.pbinfo.ro",
            "badge": "easy",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "skyline",
            "source": "PbInfo",
            "name": "Skyline",
            "link": "https://www.pbinfo.ro/probleme/2728/skyline",
            "sourceLink": "https://www.pbinfo.ro",
            "badge": "easy",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "tower",
            "source": "NerdArena",
            "name": "Tower",
            "link": "https://www.nerdarena.ro/problema/tower",
            "sourceLink": "https://www.nerdarena.ro",
            "badge": "easy",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "plaja",
            "source": "PbInfo",
            "name": "Plaja",
            "link": "https://www.pbinfo.ro/probleme/1267/plaja",
            "sourceLink": "https://www.pbinfo.ro",
            "badge": "easy",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "dreptunghi1",
            "source": "PbInfo",
            "name": "Dreptunghi1",
            "link": "https://www.pbinfo.ro/probleme/2665/dreptunghi1",
            "sourceLink": "https://www.pbinfo.ro",
            "badge": "normal",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "secvcost",
            "source": "Kilonova",
            "name": "SecvCost",
            "link": "https://kilonova.ro/problems/1059",
            "sourceLink": "https://kilonova.ro",
            "badge": "normal",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "leftmax",
            "source": "Kilonova",
            "name": "Leftmax",
            "link": "https://kilonova.ro/problems/929",
            "sourceLink": "https://kilonova.ro",
            "badge": "hard",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "matrice",
            "source": "Kilonova",
            "name": "Matrice",
            "link": "https://kilonova.ro/problems/88",
            "sourceLink": "https://kilonova.ro",
            "badge": "hard",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "inundatie",
            "source": "Kilonova",
            "name": "Inundatie",
            "link": "https://kilonova.ro/problems/1593",
            "sourceLink": "https://kilonova.ro",
            "badge": "hard",
            "tags": "Stiva"
        },
        {
            "solutionSlug": "minecraft",
            "source": "PbInfo",
            "name": "Minecraft",
            "link": "https://www.pbinfo.ro/probleme/2959/minecraft",
            "sourceLink": "https://www.pbinfo.ro",
            "badge": "hard",
            "tags": "Stiva"
        }
    ]'
/>




